import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

export const isLocalContent = process.env.VERCEL_ENV === "development";

const REPO = "bryansbtian/portfolio";
const BRANCH = "main";
const FILE_PATH = "src/content/site.json";
const FILE_URL = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

const SHORT = 200;
const LONG = 5000;
const MAX_ITEMS = 100;
const MAX_TECHNOLOGIES = 40;

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "User-Agent": "portfolio-admin",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

const localFile = () => path.join(process.cwd(), FILE_PATH);
const localSha = (text) => createHash("sha256").update(text).digest("hex");

export async function readContent(token) {
  if (isLocalContent) {
    const text = await fs.readFile(localFile(), "utf8");
    return { content: JSON.parse(text), sha: localSha(text) };
  }

  const response = await fetch(`${FILE_URL}?ref=${BRANCH}`, {
    headers: githubHeaders(token),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub read failed: ${response.status}`);

  const file = await response.json();
  return {
    content: JSON.parse(Buffer.from(file.content, "base64").toString("utf8")),
    sha: file.sha,
  };
}

export async function writeContent(token, content, sha) {
  if (isLocalContent) {
    if (localSha(await fs.readFile(localFile(), "utf8")) !== sha) {
      return { conflict: true };
    }
    const text = `${JSON.stringify(content, null, 2)}\n`;
    await fs.writeFile(localFile(), text);
    return { sha: localSha(text) };
  }

  const response = await fetch(FILE_URL, {
    method: "PUT",
    headers: { ...githubHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "content: update site from admin",
      content: Buffer.from(`${JSON.stringify(content, null, 2)}\n`).toString(
        "base64",
      ),
      sha,
      branch: BRANCH,
    }),
  });

  if (response.status === 409) return { conflict: true };
  if (!response.ok) throw new Error(`GitHub write failed: ${response.status}`);

  const result = await response.json();
  return { sha: result.content.sha };
}

export function validateContent(input) {
  const errors = [];

  const text = (value, label, max) => {
    if (typeof value !== "string" || !value.trim()) {
      errors.push(`${label} is required.`);
      return "";
    }
    if (value.length > max) errors.push(`${label} is over ${max} characters.`);
    return value;
  };

  const technologies = (value, label) => {
    if (!Array.isArray(value) || value.length > MAX_TECHNOLOGIES) {
      errors.push(`${label} must have at most ${MAX_TECHNOLOGIES} technologies.`);
      return [];
    }
    return value.map((tech, i) => text(tech, `${label} Technology ${i + 1}`, SHORT));
  };

  const list = (value, label, mapItem) => {
    if (!Array.isArray(value) || value.length > MAX_ITEMS) {
      errors.push(`${label} must have at most ${MAX_ITEMS} entries.`);
      return [];
    }
    return value.map((item, i) => mapItem(item ?? {}, `${label} ${i + 1}`));
  };

  const source = input && typeof input === "object" ? input : {};
  const contact = source.contact ?? {};

  const content = {
    hero: text(source.hero, "Hero Text", LONG),
    about: text(source.about, "About Text", LONG),
    experiences: list(source.experiences, "Experience", (item, label) => ({
      year: text(item.year, `${label} Dates`, SHORT),
      role: text(item.role, `${label} Role`, SHORT),
      company: text(item.company, `${label} Company`, SHORT),
      description: text(item.description, `${label} Description`, LONG),
      technologies: technologies(item.technologies, label),
    })),
    projects: list(source.projects, "Project", (item, label) => ({
      title: text(item.title, `${label} Title`, SHORT),
      description: text(item.description, `${label} Description`, LONG),
      technologies: technologies(item.technologies, label),
    })),
    contact: {
      address: text(contact.address, "Address", SHORT),
      phoneNo: text(contact.phoneNo, "Phone", SHORT),
      email: text(contact.email, "Email", SHORT),
    },
  };

  if (content.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.contact.email)) {
    errors.push("Email is not a valid address.");
  }

  return { content, errors };
}
