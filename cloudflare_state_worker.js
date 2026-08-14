// Cloudflare Worker + D1: permanent state storage for the Telegram bot.
// Bind the D1 database as DB and add a secret named STATE_API_KEY.

export default {
  async fetch(request, env) {
    const auth = request.headers.get("Authorization") || "";
    if (!env.STATE_API_KEY || auth !== `Bearer ${env.STATE_API_KEY}`) {
      return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const url = new URL(request.url);
    if (url.pathname !== "/state") {
      return Response.json({ ok: true, service: "kaixin-yike-state" });
    }
    if (request.method === "GET") {
      const row = await env.DB.prepare("SELECT data FROM bot_state WHERE id='main'").first();
      return Response.json({ ok: true, data: row ? JSON.parse(row.data) : null });
    }
    if (request.method === "PUT") {
      const payload = await request.json();
      const data = JSON.stringify(payload.data || {});
      await env.DB.prepare(
        "INSERT INTO bot_state(id,data,updated_at) VALUES('main',?,datetime('now')) " +
        "ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at"
      ).bind(data).run();
      return Response.json({ ok: true });
    }
    return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
  },
};
