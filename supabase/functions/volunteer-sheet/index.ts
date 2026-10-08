import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

function extractSpreadsheetId(input: string): string | null {
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match) return match[1];
  // Allow pasting a bare spreadsheet ID too
  if (/^[a-zA-Z0-9-_]{20,}$/.test(trimmed)) return trimmed;
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    // Verify the caller is a signed-in SHAMS admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Not signed in" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) return json({ error: "Not signed in" }, 401);

    const { data: adminRow } = await supabase
      .from("app_admins")
      .select("user_id")
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (!adminRow) return json({ error: "Admins only" }, 403);

    const { sheetUrl } = await req.json();
    const spreadsheetId = extractSpreadsheetId(String(sheetUrl ?? ""));
    if (!spreadsheetId) {
      return json({ error: "That does not look like a Google Sheets link" }, 400);
    }

    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const sheetsKey = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!lovableKey || !sheetsKey) {
      return json({ error: "Google Sheets connection is not set up" }, 500);
    }

    const gatewayHeaders = {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": sheetsKey,
    };

    // Get spreadsheet metadata to find the first sheet's title
    const metaRes = await fetch(`${GATEWAY_URL}/spreadsheets/${spreadsheetId}`, {
      headers: gatewayHeaders,
    });
    if (!metaRes.ok) {
      const body = await metaRes.text();
      console.error(`Sheets metadata failed [${metaRes.status}]: ${body}`);
      return json(
        {
          error:
            metaRes.status === 404
              ? "Sheet not found. Check the link and that it is shared with the connected Google account."
              : "Could not open the sheet. Check the link and sharing settings.",
          status: metaRes.status,
        },
        metaRes.status === 404 ? 404 : 502,
      );
    }
    const meta = await metaRes.json();
    const firstSheetTitle: string | undefined = meta?.sheets?.[0]?.properties?.title;
    if (!firstSheetTitle) return json({ error: "The sheet has no tabs" }, 400);

    const range = `'${firstSheetTitle.replace(/'/g, "\\'")}'!A1:Z1000`;
    const valuesRes = await fetch(
      `${GATEWAY_URL}/spreadsheets/${spreadsheetId}/values/${range}`,
      { headers: gatewayHeaders },
    );
    if (!valuesRes.ok) {
      const body = await valuesRes.text();
      console.error(`Sheets values failed [${valuesRes.status}]: ${body}`);
      return json({ error: "Could not read the sheet rows", status: valuesRes.status }, 502);
    }
    const valuesData = await valuesRes.json();
    const values: string[][] = valuesData.values ?? [];

    const headers = values[0] ?? [];
    const rows = values.slice(1).filter((r) => r.some((c) => String(c).trim() !== ""));

    return json({
      title: meta?.properties?.title ?? "Volunteer responses",
      sheet: firstSheetTitle,
      headers,
      rows,
      total: rows.length,
    });
  } catch (err) {
    console.error("volunteer-sheet error:", err);
    return json({ error: "Something went wrong reading the sheet" }, 500);
  }
});
