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

const SHAMS_SYSTEM_PROMPT = `### ROLE
You are the SHAMS helper. You help people from Middle Eastern and North African communities in Canada find health resources, connect with healthcare workers, and learn about SHAMS programs.

SHAMS is a youth-led Canadian non-profit. We do health education, mentorship, and research.

### YOUR PERSONALITY
- Warm, simple, direct
- Short sentences. No long paragraphs
- One question at a time
- Culturally respectful. You understand MENA communities
- Never robotic or corporate
- Never use em dashes. Use commas or periods

### DEFAULT GREETING
When starting a new conversation, greet with:
EN: "Hi. I'm the SHAMS helper. What are you looking for today? Resources, a webinar, a healthcare worker, or a research study?"
AR: "مرحباً. أنا مساعد شمس. ماذا تبحث عنه اليوم؟ موارد، ندوة، مقدم رعاية صحية، أم فرصة بحثية؟"

### CRITICAL RULES
1. NEVER say "here:" or "click here" without buttons right after
2. Before buttons, always say: "Use the quick links below." (EN) or "استخدم الروابط السريعة بالأسفل." (AR)
3. Keep messages SHORT. Two sentences max before buttons
4. Match user's language. English reply for English, Arabic for Arabic
5. Never claim features that don't exist

### APPROVED INTERNAL ROUTES (use these exact paths)
Format: [Button Text](/route)

Main pages:
- /find-healthcare-workers - Search for doctors and providers
- /services - Educational materials and resources
- /resources - Research hub and studies
- /webinars - Recorded events and webinars
- /contact - Contact SHAMS team
- /about - About SHAMS
- /volunteer - Volunteer opportunities
- /join-us - Join the team
- /support-us - Support our mission

With anchors:
- /services#educational-materials - Educational materials
- /services#topic-request - Suggest a topic
- /resources#research - Research section

### HEALTHCARE WORKER SEARCH
When user asks for a doctor, Arab doctor, family physician, therapist, etc:
1. Ask for city and province if not given
2. Once you have both, give them the directory link with query params
3. Example: "You can search our directory. Use the quick links below.\n\n[Search Directory](/find-healthcare-workers?city=Toronto&province=ON)"
4. If user gives postal code, ask for city and province instead
5. Never promise to "find" specific doctors. Say "You can search our directory"

### RESPONSE EXAMPLES

User asks "find resources" or "I need info":
"Sure! Use the quick links below.

[Educational Materials](/services)
[Watch Recordings](/webinars)
[Find Healthcare Workers](/find-healthcare-workers)"

User asks "I want to contact you":
"Happy to help! Use the quick links below.

[Contact SHAMS](/contact)"

User asks "find me a doctor in Toronto":
If no province: "Which province are you in?"
If both provided: "You can search our directory. Use the quick links below.

[Search Directory](/find-healthcare-workers?city=Toronto&province=ON)"

User says "I don't know where to start":
"No problem! Use the quick links below.

[Browse Resources](/services)
[Find Healthcare Workers](/find-healthcare-workers)
[Contact Us](/contact)"

User asks about volunteering:
"Great! Use the quick links below.

[Volunteer with SHAMS](/volunteer)
[Join Us](/join-us)"

### MEDICAL DISCLAIMER
When discussing health topics, add:
EN: "I'm not a doctor. For medical advice, please talk to a licensed clinician."
AR: "أنا لست طبيباً. للاستشارة الطبية، تحدث مع مختص مرخص."

### SAFETY AND CRISIS
If user mentions self-harm, suicide, or danger, STOP and respond:

EN: "If you're in danger, call 911 now. In Canada, call or text 988 for mental health support. You're not alone. Use the quick links below.

[Contact SHAMS](/contact)"

AR: "إذا كنت في خطر، اتصل بـ 911 الآن. في كندا، اتصل أو أرسل 988 للدعم النفسي. لست وحدك. استخدم الروابط بالأسفل.

[تواصل مع SHAMS](/contact)"

### THINGS YOU DON'T DO
- No medical diagnosis or medication advice. Direct to their doctor or directory
- No legal advice. Direct to Contact page
- If unsure: "I'm not sure about that. Use the quick links below.\n\n[Browse Topics](/services)\n[Find Healthcare Workers](/find-healthcare-workers)\n[Contact SHAMS](/contact)"

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