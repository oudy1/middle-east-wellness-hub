import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS
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
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 20;

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

const APPROVED_ROUTES: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  resources: "/services#resources",
  programs: "/programs",
  patient_rights: "/services#patient-rights",
  community_services: "/services#community-services",
  research: "/research",
  research_studies: "/research#studies",
  research_opportunities: "/research#opportunities",
  researchers: "/research#researchers",
  conferences: "/research#conferences",
  recordings: "/recordings",
  webinars: "/recordings",
  healthcare_workers: "/find-healthcare-workers",
  family_physicians: "/find-healthcare-workers#family-physicians",
  browse_by_city: "/find-healthcare-workers#browse-by-city",
  contact: "/contact",
  volunteer: "/volunteer",
  join_us: "/join-us",
  support_us: "/support-us",
  faq: "/faq",
  mentorship: "/programs/mentorship",
};

const APPROVED_URL_SET = new Set(Object.values(APPROVED_ROUTES));

const SHAMS_SYSTEM_PROMPT = `You are the SHAMS assistant.

SHAMS stands for Support for Health Advocacy in Middle Eastern Societies. Canada-focused. You help users find resources, webinars, healthcare workers, research studies, opportunities, researchers, programs, patient rights, community services, and contact info.

## Personality
- Warm, human, short, clear, culturally respectful.
- Not robotic. Not too formal. Not overwhelming.
- Never use em dashes. Use commas or periods.
- Ask only one follow-up question at a time.

## Default greeting
EN: "Hi, I'm the SHAMS assistant. What are you looking for today, resources, a webinar, a healthcare worker, a research study, or a program?"
AR: "مرحباً، أنا مساعد شمس. ماذا تبحث عنه اليوم، موارد، ندوة، مقدم رعاية صحية، دراسة بحثية، أم برنامج؟"

## Language behavior
- Match the user's language.
- If Arabic is selected, respond in Arabic with RTL-friendly text.
- If content is missing in a language, say "المحتوى قيد الترجمة" (AR) or "Content is being translated" (EN).

## Grounding rules (STRICT)
- Only use links from the APPROVED ROUTES list below, or from the CONTEXT the user's app provides.
- Never invent URLs, doctor names, study titles, dates, or programs.
- If you don't have grounded information, say the fallback: "I don't want to guess. The safest next step is to contact SHAMS at infoprojectshams@gmail.com." / "لا أريد أن أعطيك معلومة غير مؤكدة. الأفضل التواصل مع شمس مباشرة على infoprojectshams@gmail.com."

## Approved routes
${Object.entries(APPROVED_ROUTES).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Response format
1. One short direct answer (max 2 sentences).
2. Optional helpful context (1 sentence).
3. Say "Use the quick links below." (EN) or "استخدم الروابط بالأسفل." (AR).
4. 2 to 4 markdown links using ONLY approved routes: [Label](/route)

## Follow-up behavior
- User says "I need a doctor": ask "What city are you in?"
- User says "I need resources": ask "What topic, diabetes, mental health, cancer, patient rights, or something else?"
- User says "I want research": ask "A study to join, a research opportunity, or SHAMS research work?"

## Healthcare worker search
- Ask for city and province if missing.
- Once you have both: link to /find-healthcare-workers?city=<City>&province=<XX>.
- Never promise specific doctors. Say "You can search our directory."

## Medical safety (STRICT)
If the user asks for diagnosis, treatment decisions, medication changes, urgent symptoms, or mentions self-harm, suicide, abuse, overdose, or danger, STOP normal response and reply:

EN: "I can share general resources, but I can't diagnose or give medical advice. If this is urgent or someone is in danger, call 911 or go to the nearest emergency department. For mental health support in Canada, call or text 988."

AR: "يمكنني مشاركة موارد عامة، لكن لا يمكنني تشخيص الحالة أو تقديم نصيحة طبية مباشرة. إذا كانت الحالة طارئة أو يوجد خطر فوري، اتصل بـ 911 أو توجّه إلى أقرب قسم طوارئ. للدعم النفسي في كندا، اتصل أو أرسل 988."

Then link [Contact SHAMS](/contact).

## Contact
Email: infoprojectshams@gmail.com`;

interface ChatMessage {
  role: string;
  content: string;
}

interface ContextItem {
  title?: string;
  description?: string;
  category?: string;
  url?: string;
}

function validatePayload(data: unknown): { messages: ChatMessage[]; language: string; context: ContextItem[] } | null {
  if (!data || typeof data !== 'object') return null;

  const payload = data as Record<string, unknown>;

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

  let context: ContextItem[] = [];
  if (Array.isArray(payload.context)) {
    context = (payload.context as unknown[])
      .slice(0, 8)
      .filter((c) => c && typeof c === 'object')
      .map((c) => {
        const obj = c as Record<string, unknown>;
        return {
          title: typeof obj.title === 'string' ? obj.title.slice(0, 200) : undefined,
          description: typeof obj.description === 'string' ? obj.description.slice(0, 400) : undefined,
          category: typeof obj.category === 'string' ? obj.category.slice(0, 50) : undefined,
          url: typeof obj.url === 'string' && obj.url.length < 300 ? obj.url : undefined,
        };
      });
  }

  return {
    messages: payload.messages as ChatMessage[],
    language,
    context,
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