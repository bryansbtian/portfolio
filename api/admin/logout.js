import { clearSession, isSameOrigin, send } from "../_lib/auth.js";

export default function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
  if (!isSameOrigin(req)) return send(res, 403, { error: "Forbidden." });

  clearSession(res);
  return send(res, 200, { ok: true });
}
