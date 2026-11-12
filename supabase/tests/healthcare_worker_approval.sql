-- Repeatable database check for the doctor listing approval rules.
-- Run as one statement; it always ends with an exception, so nothing is saved.
-- Every numbered line in the RESULTS message must read as expected:
-- 2/3/6/7/8/9/10 = 0, 4/5 blocked, 11/12/13 true, 14 shows created + status_changed, 15 = 1, 16 blocked.
DO $$
DECLARE
  r text := ''; r2 text; _id uuid; _n int; _ok boolean;
BEGIN
  PERFORM set_config('request.jwt.claims', '{"role":"anon"}', true);
  PERFORM set_config('request.jwt.claim.role', 'anon', true);
  SET LOCAL ROLE anon;
  INSERT INTO public.healthcare_workers (full_name, city, province, provider_type, source, verified, email, submitted_by_email, notes)
  VALUES ('Test Doctor Zeta', 'Toronto', 'ON', 'Family Physician', 'self-submitted', false, 'z@example.com', 'z@example.com', 'private message');
  r := r || '1 visitor insert ok; ';
  SELECT count(*) INTO _n FROM public.healthcare_workers WHERE full_name = 'Test Doctor Zeta';
  r := r || '2 visitor sees own pending: ' || _n || '; ';
  SELECT count(*) INTO _n FROM public.healthcare_workers WHERE status <> 'published';
  r := r || '3 visitor sees non-published: ' || _n || '; ';
  BEGIN
    INSERT INTO public.healthcare_workers (full_name, city, province, provider_type, source, status)
    VALUES ('Test Doctor Eta', 'Toronto', 'ON', 'Family Physician', 'self-submitted', 'published');
    r := r || '4 SELF-PUBLISH ALLOWED (BAD); ';
  EXCEPTION WHEN others THEN r := r || '4 self-publish blocked (' || SQLSTATE || '); ';
  END;
  BEGIN
    INSERT INTO public.healthcare_workers (full_name, city, province, provider_type, source, verified)
    VALUES ('Test Doctor Eta', 'Toronto', 'ON', 'Family Physician', 'self-submitted', true);
    r := r || '5 SELF-VERIFY ALLOWED (BAD); ';
  EXCEPTION WHEN others THEN r := r || '5 self-verify blocked (' || SQLSTATE || '); ';
  END;
  BEGIN
    SELECT count(*) INTO _n FROM public.healthcare_worker_reviews;
    r := r || '6 visitor reads reviews rows: ' || _n || '; ';
  EXCEPTION WHEN others THEN r := r || '6 reviews blocked (' || SQLSTATE || '); ';
  END;
  BEGIN
    SELECT count(*) INTO _n FROM public.healthcare_worker_history;
    r := r || '7 visitor reads history rows: ' || _n || '; ';
  EXCEPTION WHEN others THEN r := r || '7 history blocked (' || SQLSTATE || '); ';
  END;
  UPDATE public.healthcare_workers SET status = 'published' WHERE full_name = 'Test Doctor Zeta';
  GET DIAGNOSTICS _n = ROW_COUNT;
  r := r || '8 visitor update rows: ' || _n || '; ';

  PERFORM set_config('request.jwt.claims', '{"role":"authenticated","sub":"00000000-0000-0000-0000-000000000001"}', true);
  PERFORM set_config('request.jwt.claim.role', 'authenticated', true);
  SET LOCAL ROLE authenticated;
  SELECT count(*) INTO _n FROM public.healthcare_workers WHERE status <> 'published';
  r := r || '9 non-admin sees non-published: ' || _n || '; ';
  SELECT count(*) INTO _n FROM public.healthcare_worker_reviews;
  r := r || '10 non-admin reads reviews: ' || _n || '; ';

  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{"role":"service_role"}', true);
  PERFORM set_config('request.jwt.claim.role', 'service_role', true);
  SELECT id INTO _id FROM public.healthcare_workers WHERE full_name = 'Test Doctor Zeta';
  SELECT (submitted_by_email IS NULL AND notes IS NULL AND status = 'pending_review' AND NOT verified) INTO _ok FROM public.healthcare_workers WHERE id = _id;
  r := r || '11 private fields off public row: ' || _ok || '; ';
  SELECT (submitted_by_email = 'z@example.com' AND applicant_notes = 'private message') INTO _ok FROM public.healthcare_worker_reviews WHERE worker_id = _id;
  r := r || '12 private fields kept for admins: ' || coalesce(_ok::text, 'missing') || '; ';
  UPDATE public.healthcare_workers SET status = 'published' WHERE id = _id;
  SELECT (verified AND published_at IS NOT NULL AND last_verified_at IS NOT NULL) INTO _ok FROM public.healthcare_workers WHERE id = _id;
  r := r || '13 publish sets verified+dates: ' || _ok || '; ';
  SELECT string_agg(action || ':' || coalesce(old_status,'-') || '>' || coalesce(new_status,'-'), ',' ORDER BY changed_at, action) INTO r2 FROM public.healthcare_worker_history WHERE worker_id = _id;
  r := r || '14 history: ' || coalesce(r2, 'none') || '; ';
  UPDATE public.healthcare_workers SET needs_reverification = true WHERE id = _id;
  SELECT count(*) INTO _n FROM public.healthcare_worker_history WHERE worker_id = _id AND action = 'flagged_for_reverification';
  r := r || '15 flag logged: ' || _n || '; ';
  BEGIN
    INSERT INTO public.healthcare_workers (full_name, city, province, provider_type, status)
    VALUES (' test doctor zeta', 'TORONTO', 'ON', 'Family Physician', 'published');
    r := r || '16 DUPLICATE PUBLISHED (BAD); ';
  EXCEPTION WHEN unique_violation THEN r := r || '16 duplicate blocked; ';
  END;
  RAISE EXCEPTION 'RESULTS: %', r;
END $$;
