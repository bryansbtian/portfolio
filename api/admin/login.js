import { getConfig, isSameOrigin, safeEqual, send, setSession } from "../_lib/auth.js";
import { verifyPassword } from "../_lib/password.js";

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_INPUT = 1024;

// Best effort: this memory is per function instance and resets on cold starts.
const failures = new Map();

function clientIp(req) {
  return (
    req.headers["x-real-ip"] ||
    String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    "unknown"
  );
}

function isBlocked(ip) {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (entry.resetAt <= Date.now()) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(ip) {
  const entry = failures.get(ip);
  if (entry && entry.resetAt > Date.now()) {
    entry.count += 1;
  } else {
    failures.set(ip, { count: 1, resetAt: Date.now() + WINDOW_MS });
  }
}

export default function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
  if (!isSameOrigin(req)) return send(res, 403, { error: "Forbidden." });

  const config = getConfig();
  if (!config) return send(res, 500, { error: "Admin is not configured." });

  const ip = clientIp(req);
  if (isBlocked(ip)) {
    return send(res, 429, { error: "Too many attempts. Try again in 15 minutes." });
  }

  let body;
  try {
    body = req.body;
  } catch {
    return send(res, 400, { error: "Invalid request." });
  }

  const { username, password } = body ?? {};
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length > MAX_INPUT ||
    password.length > MAX_INPUT
  ) {
    return send(res, 400, { error: "Invalid request." });
  }

  // Always run both checks so a wrong username takes as long as a wrong password.
  const usernameOk = safeEqual(username, config.username);
  const passwordOk = verifyPassword(password, config.passwordHash);

  if (!usernameOk || !passwordOk) {
    recordFailure(ip);
    return send(res, 401, { error: "Incorrect username or password." });
  }

  failures.delete(ip);
  setSession(res, config);
  return send(res, 200, { ok: true });
}
