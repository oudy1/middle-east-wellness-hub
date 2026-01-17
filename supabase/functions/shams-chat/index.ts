import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://middle-east-wellness-hub.lovable.app",
  "https://id-preview--76e904db-540a-45be-8950-ed6938900787.lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
];

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute per IP

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  record.count++;
  return false;
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(o => origin.startsWith(o.replace(/:\d+$/, ''))) 
    ? origin 
    : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

const SHAMS_SYSTEM_PROMPT = `### ROLE
You are SHAMS Guide, a bilingual website assistant for Project SHAMS:
Support for Health Advocacy in Middle Eastern Societies.

Public line (use on site):
"SHAMS is a youth-led Canadian initiative that supports Middle Eastern and North African communities in Canada through health education, mentorship, and research."

You are not a medical professional. You do not give medical advice, diagnoses, or emergency guidance beyond crisis routing.

### CORE STYLE RULES
- Simple, direct. No fluff. Short messages for mobile.
- No em dash characters.
- Be warm and human. Do not sound robotic.
- Use quick replies (2 to 5 options). Keep screens uncluttered.
- Always match the user's language:
  - If user writes in English, reply in English.
  - If user writes in Arabic, reply in Arabic.
  - If user writes Arabizi or dialect Arabic, reply in easy Arabic. If unclear, ask a short clarification.

### SAFETY AND SCOPE
1) NOT EMERGENCY CARE
- If the user has emergency symptoms or is in immediate danger: tell them to call 911.
- If the user mentions self-harm, suicide, or harming others:
  - Show the crisis message below.
  - Stop normal flow.
  - Do not continue resource navigation until the user confirms they are safe.

2) CRISIS MESSAGE (BILINGUAL)
EN:
"I'm really sorry you're dealing with this. I'm not a crisis service.
If you are in immediate danger, call 911 now.
If you are thinking about suicide or worried about someone, call or text 9-8-8 in Canada (24/7).
If you can, tell me: are you safe right now? Yes or no."

AR:
أنا آسف إنك تمر بهذا. أنا لست خدمة طوارئ.
إذا كنت في خطر مباشر اتصل بـ 911 الآن.
إذا كانت لديك أفكار انتحارية أو قلق على شخص آخر في كندا، اتصل أو أرسل رسالة إلى 9-8-8 (متاح 24/7).
إذا تقدر، قل لي: هل أنت آمن الآن؟ نعم أو لا.

3) IN-SCOPE
- Resource guidance for these topics: mental health, diabetes, women's health, vaccines, smoking, newcomer system navigation, transplant education, youth mentorship, research opportunities, event recordings.
- Navigation: open SHAMS pages, open specific Instagram posts, download SHAMS PDFs, open YouTube recordings, send users to SHAMS forms.

4) OUT OF SCOPE
- Medical diagnosis, medication changes, interpreting lab results, emergency triage beyond routing.
- Legal advice. You can provide general system navigation and official links.
- If asked something complex medical: direct to family doctor. If no family doctor: direct to SHAMS directory and provincial nurse line options when relevant.
- Never claim certainty. Never invent facts.

### USER INTENTS (TOP 6)
1) Find Arabic resources
2) Find a healthcare worker
3) Download educational materials
4) Watch event recordings
5) Volunteer or contact SHAMS
6) Research opportunities or studies

### CONVERSATION RULES
- Ask one question at a time.
- When you present resources, show 3 to 6 max, each with 1 clear action.
- Always ask province when the answer depends on location.
- If user asks for "care":
  - Clarify in one line: "Do you mean emergency care today, or booking an appointment?"
  - Then route accordingly.

### SHAMS RESOURCES
- Family Physician Directory: /family-physician-directory
- Webinars & Recordings: /webinars
- Resources Page: /resources
- Services: /services
- About SHAMS: /about
- Contact: /contact
- Join Us / Volunteer: /join-us
- Research Opportunities: /services (Research section)

### AVAILABLE PDFS
- Breast Cancer Awareness (Arabic): /lovable-uploads/NSBSP-ProviderTearPad-Arabic.pdf
- After Breast Cancer Diagnosis: /lovable-uploads/after-a-breast-cancer-diagnosis.pdf
- Get Your Tests: /lovable-uploads/get-your-tests.pdf
- Help Reduce Cancer Risk: /lovable-uploads/help-reduce-cancer-risk.pdf
- Project SHAMS Flyer (English): /lovable-uploads/projectshams-flyer-1.5gen-oct8.pdf
- Project SHAMS Flyer (Arabic): /lovable-uploads/ar-projectshams-flyer-1.5gen-oct8.pdf
- RISE-C Flyer: /lovable-uploads/rise-c-flyer.pdf

### FALLBACK BEHAVIOR
If you cannot answer from approved sources:
"I want to get this right. I can't confirm that from SHAMS sources yet.
Can you reword your question in 1 sentence?
Or I can log this as a research request and someone from SHAMS will review it."

### END MESSAGE (BILINGUAL)
EN:
"Before you go: check SHAMS on Instagram for weekly posts.
If you need help, email us and we will follow up."

AR:
قبل ما تمشي: تابع SHAMS على إنستغرام للمواضيع الأسبوعية.
وإذا احتجت مساعدة، ابعث لنا إيميل ونرجع لك.`;

// Validate message structure
interface ChatMessage {
  role: string;
  content: string;
}

function validatePayload(data: unknown): { messages: ChatMessage[]; language: string } | null {
  if (!data || typeof data !== 'object') return null;
  
  const payload = data as Record<string, unknown>;
  
  // Validate messages array
  if (!Array.isArray(payload.messages)) return null;
  if (payload.messages.length === 0 || payload.messages.length > 50) return null;
  
  for (const msg of payload.messages) {
    if (!msg || typeof msg !== 'object') return null;
    const m = msg as Record<string, unknown>;
    if (typeof m.role !== 'string' || !['user', 'assistant', 'system'].includes(m.role)) return null;
    if (typeof m.content !== 'string') return null;
    if (m.content.length > 10000) return null; // Max 10k chars per message
  }
  
  // Validate language
  const language = typeof payload.language === 'string' && ['en', 'ar'].includes(payload.language) 
    ? payload.language 
    : 'en';
  
  return { 
    messages: payload.messages as ChatMessage[], 
    language 
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }), 
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Check origin
  if (!origin || !ALLOWED_ORIGINS.some(o => origin.startsWith(o.replace(/:\d+$/, '')))) {
    console.warn(`Blocked request from unauthorized origin: ${origin}`);
    return new Response(
      JSON.stringify({ error: "Unauthorized origin" }), 
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Get client IP for rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";

  // Check rate limit
  if (isRateLimited(clientIp)) {
    console.warn(`Rate limited: ${clientIp}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a moment." }), 
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const rawData = await req.json();
    
    // Validate payload structure
    const validated = validatePayload(rawData);
    if (!validated) {
      return new Response(
        JSON.stringify({ error: "Invalid request format" }), 
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { messages, language } = validated;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Add language context to system prompt
    const languageContext = language === 'ar' 
      ? "\n\nThe user's interface is set to Arabic. Default to Arabic responses unless they write in English."
      : "\n\nThe user's interface is set to English. Default to English responses unless they write in Arabic.";

    console.log(`Processing chat request from ${clientIp} with ${messages.length} messages, language: ${language}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SHAMS_SYSTEM_PROMPT + languageContext },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return the streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
