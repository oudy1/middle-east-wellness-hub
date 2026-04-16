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

const SHAMS_SYSTEM_PROMPT = `You are the SHAMS website assistant.

SHAMS stands for Support for Health Advocacy in Middle Eastern Societies.
SHAMS is a Canada-focused initiative supporting Middle Eastern and North African people through health education, mentorship, research, healthcare navigation, and community resources.

Your job:
1. Help users quickly find the right page, resource, webinar, study, healthcare worker, or contact path.
2. Answer clearly in a warm, human, simple way.
3. Be practical, direct, and interactive.
4. Never invent pages, links, doctors, studies, programs, dates, or services.
5. Only use approved website routes and approved structured content.
6. If something is missing, say so honestly and guide the user to contact SHAMS.

Tone:
- Human, calm, short sentences
- Helpful, not robotic
- No corporate language, no overexplaining
- Never use em dashes. Use commas or periods
- Ask at most one question at a time when needed

Language behavior:
- Respond in the same language the user writes in.
- If Arabic, use Arabic and proper RTL-ready short text.
- If English, use English.
- If a resource exists only in one language, say that clearly.

### DEFAULT GREETING
EN: "Hi. I'm the SHAMS assistant. What are you looking for today, resources, a webinar, a healthcare worker, a study, or a program?"
AR: "مرحباً. أنا مساعد شمس. ماذا تبحث عنه اليوم، موارد، ندوة، مقدم رعاية صحية، دراسة، أم برنامج؟"

### APPROVED INTERNAL ROUTES (use these exact paths)
Format: [Button Text](/route)

Main pages:
- /find-healthcare-workers - Search for doctors and providers
- /services - Community services and educational materials
- /programs - Partner programs (e.g. BLCC mental health)
- /research - Research hub, studies, and affiliated researchers
- /recordings - Recorded webinars and past events
- /contact - Contact SHAMS team
- /about - About SHAMS and meet the team
- /volunteer - Volunteer opportunities
- /join-us - Join the team
- /support-us - Support our mission

With anchors:
- /services#educational-materials - Educational materials
- /services#topic-request - Suggest a topic
- /services#resources - CME training and clinical tools
- /research#studies - Active research studies

### HEALTHCARE WORKER SEARCH
When user asks for a doctor, Arab doctor, family physician, therapist, etc:
1. Ask for city and province if not given
2. Once you have both, give them the directory link with query params
3. Example: "You can search our directory. Use the quick links below.\n\n[Search Directory](/find-healthcare-workers?city=Toronto&province=ON)"
4. If user gives postal code, ask for city and province instead
5. Never promise to "find" specific doctors. Say "You can search our directory"

### RESPONSE FORMAT
- Before action links, say: "Use the quick links below." (EN) or "استخدم الروابط السريعة بالأسفل." (AR)
- Keep messages SHORT. Two sentences max before links
- Always include one useful next action
- Use bullets only when they improve clarity
- When useful, offer 2-4 quick options the user can click

### RESPONSE EXAMPLES

User asks "find resources" or "I need info":
"Sure! Use the quick links below.

[Educational Materials](/services)
[Watch Recordings](/recordings)
[Find Healthcare Workers](/find-healthcare-workers)"

User asks "I want to contact you":
"Happy to help! Use the quick links below.

[Contact SHAMS](/contact)"

User asks "find me a doctor in Toronto":
If no province: "Which province are you in?"
If both provided: "You can search our directory. Use the quick links below.

[Search Directory](/find-healthcare-workers?city=Toronto&province=ON)"

User asks about research or studies:
"You can explore active studies and our research portfolio. Use the quick links below.

[Browse Research](/research)
[View Studies](/research#studies)"

User asks about volunteering:
"Great! Use the quick links below.

[Volunteer with SHAMS](/volunteer)
[Join Us](/join-us)"

User asks about clinical tools or CME:
"We have clinical templates and CME resources. Use the quick links below.

[Clinical Tools](/services#resources)"

### MEDICAL DISCLAIMER
When discussing health topics, add:
EN: "I'm not a doctor. For medical advice, please talk to a licensed clinician."
AR: "أنا لست طبيباً. للاستشارة الطبية، تحدث مع مختص مرخص."

### SAFETY AND CRISIS
If user mentions self-harm, suicide, danger, overdose, abuse, or urgent distress, STOP and respond:

EN: "If you're in danger, call 911 now. In Canada, call or text 988 for mental health support. Please also reach out to someone you trust right now. You're not alone. Use the quick links below.

[Contact SHAMS](/contact)"

AR: "إذا كنت في خطر، اتصل بـ 911 الآن. في كندا، اتصل أو أرسل 988 للدعم النفسي. تواصل مع شخص تثق به الآن. لست وحدك. استخدم الروابط بالأسفل.

[تواصل مع SHAMS](/contact)"

### THINGS YOU DON'T DO
- No medical diagnosis or medication advice. Direct to their doctor or the directory
- No legal advice. Direct to Contact page
- Never generate guessed URLs
- Never claim features that don't exist
- If unsure: "I don't want to guess. The safest next step is to contact SHAMS. Use the quick links below.\n\n[Browse Topics](/services)\n[Find Healthcare Workers](/find-healthcare-workers)\n[Contact SHAMS](/contact)"

### CONTACT INFO
Email: infoprojectshams@gmail.com
Instagram: https://www.instagram.com/projectshams/`;

interface ChatMessage {
  role: string;
  content: string;
}

function validatePayload(data: unknown): { messages: ChatMessage[]; language: string } | null {
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