import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const SESSION_SECONDS = 8 * 60 * 60;
const isLocal = process.env.VERCEL_ENV === "development";
const COOKIE_NAME = isLocal ? "admin_session" : "__Host-admin_session";

export function getConfig() {
  const { USERNAME: username, PASSWORD: passwordHash, GITHUB_TOKEN: githubToken } = process.env;

  if (!username || !passwordHash) return null;
  return { username, passwordHash, githubToken };
}

export function safeEqual(a, b) {
  const digest = (value) => createHash("sha256").update(String(value)).digest();
  return timingSafeEqual(digest(a), digest(b));
}

// Keyed by the password hash, so changing the password ends all sessions.
function sign(payload, config) {
  return createHmac("sha256", `admin-session:${config.passwordHash}`)
    .update(payload)
    .digest("base64url");
}

function readCookie(req, name) {
  for (const part of (req.headers.cookie || "").split(";")) {
    const index = part.indexOf("=");
    if (index > 0 && part.slice(0, index).trim() === name) {
      return part.slice(index + 1).trim();
    }
  }
  return null;
}

function cookie(value, maxAge) {
  const secure = isLocal ? "" : " Secure;";
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly;${secure} SameSite=Strict; Max-Age=${maxAge}`;
}

export function setSession(res, config) {
  const payload = Buffer.from(
    JSON.stringify({
      u: config.username,
      exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
    }),
  ).toString("base64url");
  res.setHeader(
    "Set-Cookie",
    cookie(`${payload}.${sign(payload, config)}`, SESSION_SECONDS),
  );
}

export function clearSession(res) {
  res.setHeader("Set-Cookie", cookie("", 0));
}

export function hasSession(req, config) {
  const token = readCookie(req, COOKIE_NAME);
  if (!token) return false;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return false;
  if (!safeEqual(signature, sign(payload, config))) return false;

  try {
    const { u, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return u === config.username && exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function isSameOrigin(req) {
  const { origin } = req.headers;
  if (!origin) return false;
  try {
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function send(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  res.status(status).json(body);
}
