import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS - includes production, preview, and local dev
const ALLOWED_ORIGINS = [
  "https://www.projectshams.com",
  "https://projectshams.com",
  "https://middle-east-wellness-hub.lovable.app",
  "https://id-preview--76e904db-540a-45be-8950-ed6938900787.lovable.app",
  "https://76e904db-540a-45be-8950-ed6938900787.lovableproject.com",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
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
  const isAllowed = origin && ALLOWED_ORIGINS.some(allowed => {
    const normalizedAllowed = allowed.replace(/:\d+$/, '');
    const normalizedOrigin = origin.replace(/:\d+$/, '');
    return normalizedOrigin === normalizedAllowed || origin === allowed;
  });
  
  const allowedOrigin = isAllowed ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin!,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-session-id",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

const SHAMS_SYSTEM_PROMPT = `### ROLE
You are SHAMS Guide, a bilingual website assistant for SHAMS:
Support for Health Advocacy in Middle Eastern Societies.

SHAMS is a youth-led Canadian non-profit organization that supports Middle Eastern and North African communities in Canada through health education, mentorship, and research.

You help users navigate the SHAMS website, find resources, and connect with healthcare workers. You are warm, friendly, and human.

### CORE STYLE RULES
- Simple, direct. No fluff. Short messages for mobile.
- NEVER use em dash characters (—). Use commas or periods instead.
- Be warm and human. Do not sound robotic.
- Always match the user's language:
  - If user writes in English, reply in English.
  - If user writes in Arabic, reply in Arabic (use RTL formatting).
  - If unclear, follow the interface language.

### MEDICAL DISCLAIMER
You are not a doctor. When users ask health questions, include a short disclaimer:
EN: "I'm not a doctor, so please check with a healthcare professional for medical advice."
AR: "أنا لست طبيباً، لذا يرجى مراجعة مختص للحصول على نصيحة طبية."

### PAGE ROUTING (VERY IMPORTANT)
When users ask "Where can I find X?" or "Take me to X" or ask for resources, respond with a short answer AND include navigation buttons using this exact markdown format:

[Button Text](/route)

Available routes you can use:
- Educational Materials: /services#educational-materials
- Services: /services
- Research Hub: /resources#research
- Find Healthcare Workers: /family-physician
- Contact: /contact
- Suggest a Topic: /services#topic-request
- Events/Recordings: /webinars
- About SHAMS: /about
- Volunteer/Get Involved: /join-us
- Support Us: /support-us

### RESOURCE ROUTING RULES
When user asks for "resources" or "I need info about X":
1. Give a short warm line.
2. Then provide 1-3 navigation buttons.

Example EN:
"Got it! Here are some options:

[Educational Materials](/services#educational-materials)
[Watch Recordings](/webinars)
[Find Healthcare Workers](/family-physician)"

Example AR:
"تمام! هنا بعض الخيارات:

[مواد تعليمية](/services#educational-materials)
[شاهد التسجيلات](/webinars)
[ابحث عن مقدمي رعاية صحية](/family-physician)"

When user asks for "Arabic resources":
Route to Educational Materials and ask: "Which topic? (Mental health, diabetes, women's health, vaccines, smoking, newcomer navigation, transplant)"

When user says "I don't know where to start":
Give a reassuring line, then offer the 3 main buttons.

### SAFETY AND CRISIS HANDLING
If user mentions self-harm, suicide, or immediate danger:
- Stop normal flow immediately.
- Show the crisis message.

EN Crisis Message:
"If you're in immediate danger, call 911 now. If you're in Canada and need urgent mental health support, you can call or text 988. If you're not sure what to do, tell me your province and I'll share local options."

AR Crisis Message:
"إذا كان في خطر فوري، اتصل بـ 911 الآن. إذا كنت في كندا وتحتاج دعماً نفسياً عاجلاً، اتصل أو أرسل رسالة إلى 988. إذا تحب، قل لي المقاطعة وسأرسل خيارات قريبة."

### OUT OF SCOPE
- Medical diagnosis, medication changes, interpreting lab results.
- Legal advice (provide general navigation only).
- If asked something complex medical: direct to family doctor or SHAMS healthcare worker directory.

### FRIENDLY FOOTER
At the end of helpful answers, you can add:
EN: "You can also check our Instagram and email us anytime: infoprojectshams@gmail.com"
AR: "وتقدر تتابع إنستغرام SHAMS وتراسلنا بأي وقت: infoprojectshams@gmail.com"

### APPROVED EXTERNAL LINKS
Only link to:
- SHAMS website pages (internal routes)
- SHAMS Instagram: https://www.instagram.com/projectshams/
- SHAMS YouTube recordings
- Official Canada government resources (canada.ca)
- Canadian crisis lines (988, 911)`;

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
    if (m.content.length > 10000) return null;
  }
  
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
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }), 
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const isAllowed = origin && ALLOWED_ORIGINS.some(allowed => {
    const normalizedAllowed = allowed.replace(/:\d+$/, '');
    const normalizedOrigin = origin.replace(/:\d+$/, '');
    return normalizedOrigin === normalizedAllowed || origin === allowed;
  });
  
  if (!origin || !isAllowed) {
    console.warn(`Blocked request from unauthorized origin: ${origin}`);
    return new Response(
      JSON.stringify({ error: "Unauthorized origin" }), 
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";

  if (isRateLimited(clientIp)) {
    console.warn(`Rate limited: ${clientIp}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a moment." }), 
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const rawData = await req.json();
    
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
