import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;
const GEMINI_API_URL = `${import.meta.env.GEMINI_API_URL}`;

const SYSTEM_PROMPT = `You are GG Assistant, an expert AI gaming companion. You help gamers with:
- Game guides, walkthroughs, and tutorials
- Character builds, strategies, and meta analysis  
- Latest gaming news, events, and updates
- Tips for leveling up, finding resources, and improving skills
- Game recommendations based on preferences

Be enthusiastic but concise. Use gaming terminology naturally. Format responses with markdown — use headers, bullet points, bold text, and code blocks for builds/stats. Add relevant emojis. Always be helpful and encouraging. Keep responses focused and actionable.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    // const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    // const GEMINI_API_URL = Deno.env.get("GEMINI_API_URL");
    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;
    const GEMINI_API_URL = `${import.meta.env.GEMINI_API_URL}`;
    const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "google/gemini-3-flash-preview";
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");
    if (!GEMINI_API_URL) throw new Error("GEMINI_API_URL is not configured");

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited — try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Add funds in Settings > Workspace > Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
