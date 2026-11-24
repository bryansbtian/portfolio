import { getConfig, hasSession, isSameOrigin, send } from "../_lib/auth.js";
import { isLocalContent, readContent, validateContent, writeContent } from "../_lib/content.js";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "PUT") {
    return send(res, 405, { error: "Method not allowed." });
  }

  const config = getConfig();
  if (!config) return send(res, 500, { error: "Admin is not configured." });
  if (!hasSession(req, config)) return send(res, 401, { error: "Please log in." });

  try {
    if (req.method === "GET") {
      return send(res, 200, await readContent(config.githubToken));
    }

    if (!isSameOrigin(req)) return send(res, 403, { error: "Forbidden." });
    if (!config.githubToken && !isLocalContent) {
      return send(res, 503, { error: "Saving needs GITHUB_TOKEN set in Vercel." });
    }

    let body;
    try {
      body = req.body;
    } catch {
      return send(res, 400, { error: "Invalid request." });
    }

    if (typeof body?.sha !== "string" || !body.sha) {
      return send(res, 400, { error: "Invalid request." });
    }

    const { content, errors } = validateContent(body.content);
    if (errors.length) return send(res, 422, { error: errors[0], errors });

    const result = await writeContent(config.githubToken, content, body.sha);
    if (result.conflict) {
      return send(res, 409, {
        error: "The content changed somewhere else. Reload before saving.",
      });
    }
    return send(res, 200, { sha: result.sha, content });
  } catch (error) {
    console.error(error);
    return send(res, 502, { error: "Could not reach the content store. Your edits are still here." });
  }
}
