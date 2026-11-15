import { corsHeaders as baseCors } from 'npm:@supabase/supabase-js@2/cors';

// The site's client sends x-session-id on every call, so it must be allowed here too
const corsHeaders = {
  ...baseCors,
  'Access-Control-Allow-Headers': `${baseCors['Access-Control-Allow-Headers']}, x-session-id`,
};
import { z } from 'npm:zod@3.23.8';
import { createClient } from 'npm:@supabase/supabase-js@2';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';
const TO_EMAIL = 'infoprojectshams@gmail.com';

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(8000),
  // 'topic_request' = webinar topic form: saved first, then emailed
  kind: z.enum(['contact', 'topic_request']).optional(),
  topic: z.string().trim().min(2).max(200).optional(),
  description: z.string().trim().max(1000).optional(),
  language: z.enum(['en', 'ar']).optional(),
  // Spam guard fields sent by the site's forms
  website: z.string().max(500).optional(),
  elapsedMs: z.number().int().nonnegative().optional(),
});

// Best-effort per-visitor limit (kept in memory, resets when the function restarts)
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MIN_FILL_MS = 3000;
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service is not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return json({ error: 'Please check the form fields and try again.' }, 400);
    }

    const { name, email, subject, message, website, elapsedMs, kind, topic, description, language } = parsed.data;

    const ip =
      req.headers.get('cf-connecting-ip') ??
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      'unknown';
    if (isRateLimited(ip)) {
      console.warn('send-contact-email: rate limit reached');
      return json({ error: 'Too many messages. Please wait a few minutes and try again.' }, 429);
    }

    // Bots fill the hidden field or submit instantly: pretend success, send nothing
    if ((website && website.trim() !== '') || (elapsedMs !== undefined && elapsedMs < MIN_FILL_MS)) {
      console.warn('send-contact-email: spam guard triggered');
      return json({ success: true });
    }


    if (kind === 'topic_request') {
      if (!topic) return json({ error: 'Please check the form fields and try again.' }, 400);
      const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
      const { error: saveError } = await admin.from('webinar_topic_requests').insert({
        name, email, topic, description: description || null, language: language ?? 'en',
      });
      if (saveError) {
        console.error('topic request save failed:', saveError.message);
        return json({ error: 'Could not save your request. Please try again later.' }, 500);
      }
    }

    const isTopic = kind === 'topic_request';
    const html = isTopic ? `
      <h2>New webinar topic request from the SHAMS website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Topic:</strong> ${escapeHtml(topic ?? '')}</p>
      <p><strong>Why it matters:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(description || '(not given)')}</p>
      <p><strong>Site language:</strong> ${language === 'ar' ? 'Arabic' : 'English'}</p>
      <p style="color:#666">Saved in the admin area under Topic requests.</p>
    ` : `
      <h2>New contact form message from the SHAMS website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'SHAMS Website <onboarding@resend.dev>',
        to: [TO_EMAIL],
        reply_to: email,
        subject: isTopic ? `[SHAMS Topic Request] ${topic}` : `[SHAMS Contact] ${subject}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Resend request failed [${response.status}]: ${errorBody}`);
      // Provider details stay in the private logs, never sent to the visitor
      // A saved topic request is not lost if the email fails; the visitor still gets thanks
      if (isTopic) return json({ success: true, emailed: false });
      return json({ error: 'Email delivery failed. Please try again later.' }, 502);
    }

    const data = await response.json();
    console.log('Contact email sent', data?.id ?? '');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-contact-email error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected error sending message' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
