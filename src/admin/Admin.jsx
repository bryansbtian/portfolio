/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LuArrowUpRight,
  LuBriefcase,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
  LuFileText,
  LuFolderOpen,
  LuLogOut,
  LuMail,
  LuMenu,
  LuPlus,
  LuSearch,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import AdminSkeleton from "./AdminSkeleton.jsx";

const SECTIONS = [
  { id: "intro", label: "Intro", icon: LuFileText, description: "Edit the hero and about text on your homepage." },
  { id: "experiences", label: "Experience", icon: LuBriefcase, description: "Manage the roles shown on your portfolio." },
  { id: "projects", label: "Projects", icon: LuFolderOpen, description: "Manage the projects shown on your portfolio." },
  { id: "contact", label: "Contact", icon: LuMail, description: "Update how people can reach you." },
];

const BLANK_EXPERIENCE = { year: "", role: "", company: "", description: "", technologies: [] };
const BLANK_PROJECT = { title: "", description: "", technologies: [] };
const COLLAPSED_KEY = "portfolio.admin.sidebarCollapsed";
const PAGE_BACKGROUND =
  "bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]";

const cardClass = "rounded-xl border border-neutral-800 bg-neutral-900/60 shadow-sm";
const inputClass =
  "w-full rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-base text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 sm:text-sm";
const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-200 transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-10";
const primaryClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 disabled:cursor-not-allowed disabled:opacity-40 aria-busy:animate-pulse sm:min-h-10";

let nextId = 0;
const withId = (item) => ({ ...item, _id: ++nextId });

const toDraft = (content) => ({
  ...content,
  experiences: content.experiences.map(withId),
  projects: content.projects.map(withId),
});

const stripIds = (draft) => {
  const strip = ({ _id, _isNew, ...item }) => item; // eslint-disable-line no-unused-vars
  return {
    ...draft,
    experiences: draft.experiences.map(strip),
    projects: draft.projects.map(strip),
  };
};

function readCollapsed() {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === "true";
  } catch {
    return false;
  }
}

function persistCollapsed(collapsed) {
  try {
    localStorage.setItem(COLLAPSED_KEY, String(collapsed));
  } catch {
    // The sidebar still works without a remembered preference.
  }
}

async function api(path, method = "GET", body) {
  try {
    const response = await fetch(path, {
      method,
      credentials: "same-origin",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.headers.get("content-type")?.includes("application/json")) {
      return { status: response.status, ok: false, data: { error: "The admin API is not available." } };
    }
    const data = await response.json();
    return { status: response.status, ok: response.ok, data };
  } catch {
    return { status: 0, ok: false, data: { error: "Network error. Check your connection." } };
  }
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-neutral-300">{label}</span>
      {children}
    </label>
  );
}

function TextField({ label, value, onChange, type = "text" }) {
  return (
    <Field label={label}>
      <input type={type} className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

function TextArea({ label, value, onChange, rows = 7 }) {
  return (
    <Field label={label}>
      <textarea
        rows={rows}
        style={{ minHeight: `calc(${rows * 1.625}em + 1rem + 2px)` }}
        className={`${inputClass} resize-y leading-relaxed`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

function TagInput({ value, onChange }) {
  const [text, setText] = useState("");

  const commit = () => {
    const added = text.split(",").map((tag) => tag.trim()).filter(Boolean);
    if (added.length) onChange([...value, ...added.filter((tag) => !value.includes(tag))]);
    setText("");
  };

  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-neutral-300">Technologies</span>
      <div className="flex flex-wrap gap-2 rounded-lg border border-neutral-800 bg-neutral-950/60 p-2 focus-within:border-purple-400">
        {value.map((tag, index) => (
          <span key={tag} className="flex min-w-0 max-w-full items-center gap-1 rounded-md bg-purple-500/15 py-0.5 pl-2 pr-0.5 text-[13px] text-purple-200">
            <span className="min-w-0 break-words">{tag}</span>
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-purple-300/70 hover:bg-purple-500/20 hover:text-white"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
            >
              <LuX className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        <input
          aria-label="Add technology"
          className="min-w-[8rem] flex-1 bg-transparent px-1 py-1 text-base text-neutral-100 outline-none placeholder:text-neutral-600 sm:text-sm"
          placeholder="Type and Press Enter"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit();
            } else if (e.key === "Backspace" && !text && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
        />
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-300">
        <Icon className="h-5 w-5" />
      </span>
      <p className="font-semibold text-neutral-100">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-neutral-400">{text}</p>
    </div>
  );
}

function ItemList({ section, items, onChange, blank, noun, titleOf, subtitleOf, renderFields }) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();

  const update = (index, patch) =>
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const add = () => {
    setQuery("");
    onChange([{ ...withId(blank), _isNew: true }, ...items]);
  };

  const visible = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) =>
      !search ||
      [titleOf(item), subtitleOf?.(item), ...item.technologies]
        .some((value) => value?.toLowerCase().includes(search)),
    );
  const technologyCount = new Set(items.flatMap((item) => item.technologies)).size;

  return (
    <div className="space-y-6">
      <div className={`${cardClass} grid grid-cols-2 sm:grid-cols-[2fr_1fr]`}>
        <div className="p-4 sm:p-5">
          <p className="text-[13px] text-neutral-400">Total {section.label}</p>
          <p className="mt-1 text-2xl font-bold text-neutral-100 sm:text-3xl">{items.length}</p>
        </div>
        <div className="border-l border-neutral-800 p-4 sm:p-5">
          <p className="text-[13px] text-neutral-400">Technologies</p>
          <p className="mt-1 text-2xl font-bold text-neutral-100 sm:text-3xl">{technologyCount}</p>
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex flex-col gap-3 border-b border-neutral-800 p-4 sm:flex-row sm:p-5">
          <div className="relative flex-1">
            <LuSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              aria-label={`Search ${section.label}`}
              placeholder={`Search ${section.label}`}
              className={`${inputClass} min-h-11 pl-9 sm:min-h-10`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="button" className={buttonClass} onClick={add}>
            <LuPlus className="h-4 w-4" />
            Add {noun}
          </button>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            icon={search ? LuSearch : section.icon}
            title={search ? "No Matches Found" : `No ${section.label} Yet`}
            text={search ? "Try a different search." : `Add your first ${noun.toLowerCase()} to show it on your portfolio.`}
          />
        ) : (
          <ul className="divide-y divide-neutral-800">
            {visible.map(({ item, index }) => (
              <li key={item._id}>
                <details open={Boolean(item._isNew)} className="group">
                  <summary className="flex min-h-14 cursor-pointer select-none list-none items-center gap-3 px-4 py-3 transition hover:bg-neutral-800/40 sm:px-5 [&::-webkit-details-marker]:hidden">
                    <LuChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-neutral-500 transition-transform group-open:rotate-90" />
                    <span className="min-w-0 flex-1 break-words">
                      <span className="block text-sm font-medium text-neutral-100">{titleOf(item) || "New Entry"}</span>
                      {subtitleOf && <span className="mt-0.5 block text-[13px] text-neutral-500">{subtitleOf(item)}</span>}
                    </span>
                    <span className="hidden shrink-0 rounded-md bg-neutral-800 px-2 py-1 text-xs text-neutral-400 sm:block">
                      {item.technologies.length} tech
                    </span>
                  </summary>
                  <div className="space-y-4 border-t border-neutral-800 bg-neutral-950/30 p-4 sm:p-5">
                    {renderFields(item, (patch) => update(index, patch))}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-red-900 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-950 sm:min-h-10"
                        onClick={() => onChange(items.filter((_, i) => i !== index))}
                      >
                        <LuTrash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result = await api("/api/admin/login", "POST", { username, password });
    setBusy(false);
    if (result.ok) {
      setPassword("");
      onSuccess();
    } else {
      setError(result.data.error || "Could not log in.");
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <form onSubmit={submit} aria-busy={busy} className="w-full max-w-[540px] rounded-xl border border-neutral-800 bg-neutral-900/80 px-6 py-8 shadow-2xl backdrop-blur-sm sm:px-10 sm:py-10">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-neutral-100">Admin Log In</h1>
          <p className="text-sm text-neutral-400 sm:text-base">Sign in to your portfolio admin</p>
        </div>
        <div className="space-y-5">
          <Field label="Username">
            <input className={`${inputClass} h-11`} autoComplete="username" autoCapitalize="none" spellCheck={false} autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} />
          </Field>
          <Field label="Password">
            <input className={`${inputClass} h-11`} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
          <button type="submit" disabled={busy} aria-busy={busy} className={`${primaryClass} h-11 w-full text-base`}>
            Sign In
          </button>
        </div>
      </form>
    </main>
  );
}

function Sidebar({ active, onSelect, onLogout, collapsed = false, onToggle, headerAction }) {
  const rowClass = `flex h-10 w-full items-center gap-3 rounded-lg text-[13px] transition ${collapsed ? "justify-center px-0" : "px-3"}`;
  const idleClass = "text-neutral-400 hover:bg-neutral-800/70 hover:text-neutral-100";

  return (
    <div className="flex h-full flex-col bg-neutral-950">
      <div className={collapsed ? "flex justify-center px-1.5 py-3" : "flex items-center justify-between gap-2 px-3 pb-5 pt-4"}>
        {!collapsed && (
          <div className="min-w-0 px-2 py-1.5">
            <span className="block truncate text-xl font-semibold text-neutral-100">Bryan Susanto</span>
            <span className="block text-[11px] text-neutral-500">Admin Portal</span>
          </div>
        )}
        {onToggle && (
          <button
            type="button"
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            onClick={onToggle}
            className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-800 hover:text-neutral-100"
          >
            {collapsed ? <LuChevronsRight className="h-5 w-5" /> : <LuChevronsLeft className="h-5 w-5" />}
          </button>
        )}
        {headerAction}
      </div>

      <nav aria-label="Admin Navigation" className={`flex-1 overflow-y-auto pb-2 ${collapsed ? "px-1.5" : "px-3"}`}>
        <ul className="space-y-0.5">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                aria-current={active === id ? "page" : undefined}
                title={collapsed ? label : undefined}
                onClick={() => onSelect(id)}
                className={`${rowClass} ${active === id ? "bg-purple-500/15 text-purple-100" : idleClass}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={collapsed ? "sr-only" : ""}>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`space-y-0.5 border-t border-neutral-800 py-3 ${collapsed ? "px-1.5" : "px-3"}`}>
        <a href="/" target="_blank" rel="noreferrer" title="View Site" className={`${rowClass} ${idleClass}`}>
          <LuArrowUpRight className="h-4 w-4 shrink-0" />
          <span className={collapsed ? "sr-only" : ""}>View Site</span>
        </a>
        <button type="button" title="Log Out" onClick={onLogout} className={`${rowClass} ${idleClass}`}>
          <LuLogOut className="h-4 w-4 shrink-0" />
          <span className={collapsed ? "sr-only" : ""}>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [view, setView] = useState("loading");
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState("");
  const [sha, setSha] = useState("");
  const [tab, setTab] = useState("intro");
  const [notice, setNotice] = useState(null);
  const [saving, setSaving] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [menuOpen, setMenuOpen] = useState(false);

  const dirty = useMemo(
    () => Boolean(draft) && JSON.stringify(stripIds(draft)) !== saved,
    [draft, saved],
  );
  const section = SECTIONS.find(({ id }) => id === tab);

  const load = useCallback(async ({ keepDraft = false } = {}) => {
    if (!keepDraft) setView("loading");
    const result = await api("/api/admin/content");
    if (result.status === 401) {
      setView("login");
    } else if (result.ok) {
      if (!keepDraft) {
        setDraft(toDraft(result.data.content));
        setSaved(JSON.stringify(result.data.content));
        setSha(result.data.sha);
        setConflict(false);
        setNotice(null);
      }
      setView("ready");
    } else {
      setNotice({ type: "error", text: result.data.error || "Could not load content." });
      setView("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  const patch = (changes) => {
    setDraft((current) => ({ ...current, ...changes }));
    if (!conflict) setNotice(null);
  };

  const save = async () => {
    setSaving(true);
    setNotice(null);
    const result = await api("/api/admin/content", "PUT", { content: stripIds(draft), sha });
    setSaving(false);

    if (result.ok) {
      setSaved(JSON.stringify(result.data.content));
      setSha(result.data.sha);
      setNotice({ type: "success", text: "Saved. Your site will update in about a minute." });
    } else if (result.status === 401) {
      setNotice({ type: "error", text: "Your session expired. Log in again, then save." });
      setView("login");
    } else {
      if (result.status === 409) setConflict(true);
      setNotice({ type: "error", text: result.data.error || "Could not save." });
    }
  };

  const logout = async () => {
    if (dirty && !window.confirm("Log out and lose your unsaved changes?")) return;
    await api("/api/admin/logout", "POST");
    setMenuOpen(false);
    setDraft(null);
    setSaved("");
    setNotice(null);
    setView("login");
  };

  const discard = () => {
    if (window.confirm("Discard all unsaved changes?")) {
      setDraft(toDraft(JSON.parse(saved)));
      if (!conflict) setNotice(null);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      persistCollapsed(!current);
      return !current;
    });
  };

  const selectSection = (id) => {
    setTab(id);
    setMenuOpen(false);
  };

  if (view === "loading") return <AdminSkeleton />;

  if (view !== "ready" || !draft) {
    return (
      <div className={`min-h-dvh text-neutral-300 antialiased ${PAGE_BACKGROUND}`}>
        {view === "login" && <Login onSuccess={() => load({ keepDraft: Boolean(draft) })} />}
        {view === "error" && (
          <main className="flex min-h-dvh items-center justify-center px-4">
            <div className={`${cardClass} w-full max-w-md p-8 text-center`}>
              <p role="alert" className="mb-4 text-red-300">{notice?.text}</p>
              <button type="button" className={buttonClass} onClick={() => load()}>Try Again</button>
            </div>
          </main>
        )}
      </div>
    );
  }

  return (
    <div className={`h-dvh overflow-hidden text-neutral-300 antialiased ${PAGE_BACKGROUND}`}>
      <aside className={`fixed inset-y-0 left-0 z-40 hidden border-r border-neutral-800 transition-[width] duration-200 lg:block ${collapsed ? "w-12" : "w-64"}`}>
        <Sidebar active={tab} onSelect={selectSection} onLogout={logout} collapsed={collapsed} onToggle={toggleCollapsed} />
      </aside>

      {menuOpen && (
        <div role="dialog" aria-modal="true" aria-label="Admin Navigation" className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close Menu Backdrop" tabIndex={-1} className="absolute inset-0 bg-black/70" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-neutral-800">
            <Sidebar
              active={tab}
              onSelect={selectSection}
              onLogout={logout}
              headerAction={
                <button type="button" aria-label="Close Menu" autoFocus className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white" onClick={() => setMenuOpen(false)}>
                  <LuX className="h-5 w-5" />
                </button>
              }
            />
          </div>
        </div>
      )}

      <div className={`flex h-dvh flex-col overflow-hidden transition-[padding] duration-200 ${collapsed ? "lg:pl-12" : "lg:pl-64"}`}>
        <header className="z-30 flex shrink-0 items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur-md lg:hidden">
          <span className="truncate text-xl font-semibold text-neutral-100">Bryan Susanto</span>
          <button type="button" aria-label="Open Menu" className={`${buttonClass} w-11 shrink-0 px-0`} onClick={() => setMenuOpen(true)}>
            <LuMenu className="h-5 w-5" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto overscroll-y-none [scrollbar-gutter:stable]">
          <div className="mx-auto max-w-6xl space-y-6 px-4 pb-28 pt-6 sm:px-6 sm:pb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-xl font-semibold text-neutral-100 md:text-2xl">{section.label}</h1>
                <p className="mt-1 text-sm text-neutral-400">{section.description}</p>
              </div>
              <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-2 border-t border-neutral-800 bg-neutral-950 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:static sm:shrink-0 sm:border-0 sm:bg-transparent sm:p-0">
                <button type="button" className={`${buttonClass} flex-1 sm:flex-none`} disabled={!dirty || saving} onClick={discard}>Discard</button>
                <button type="button" aria-busy={saving} className={`${primaryClass} flex-1 sm:flex-none`} disabled={!dirty || saving || conflict} onClick={save}>
                  Save
                </button>
              </div>
            </div>

            {notice && (
              <div
                role="status"
                className={`flex flex-wrap items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
                  notice.type === "success"
                    ? "border-emerald-900 bg-emerald-950/50 text-emerald-200"
                    : "border-red-900 bg-red-950/50 text-red-200"
                }`}
              >
                <span className="mr-auto">{notice.text}</span>
                {conflict && (
                  <button type="button" className={buttonClass} onClick={() => load()}>
                    Reload Latest (Drops My Edits)
                  </button>
                )}
              </div>
            )}

            {tab === "intro" && (
              <div className={`${cardClass} space-y-5 p-4 sm:p-6`}>
                <TextArea label="Hero Text" value={draft.hero} onChange={(hero) => patch({ hero })} rows={9} />
                <TextArea label="About Text" value={draft.about} onChange={(about) => patch({ about })} rows={9} />
              </div>
            )}

            {tab === "experiences" && (
              <ItemList
                key="experiences"
                section={section}
                items={draft.experiences}
                onChange={(experiences) => patch({ experiences })}
                blank={BLANK_EXPERIENCE}
                noun="Experience"
                titleOf={(item) => item.role}
                subtitleOf={(item) => [item.company, item.year].filter(Boolean).join(" · ")}
                renderFields={(item, update) => (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label="Role" value={item.role} onChange={(role) => update({ role })} />
                      <TextField label="Company" value={item.company} onChange={(company) => update({ company })} />
                    </div>
                    <TextField label="Dates" value={item.year} onChange={(year) => update({ year })} />
                    <TextArea label="Description" value={item.description} onChange={(description) => update({ description })} />
                    <TagInput value={item.technologies} onChange={(technologies) => update({ technologies })} />
                  </>
                )}
              />
            )}

            {tab === "projects" && (
              <ItemList
                key="projects"
                section={section}
                items={draft.projects}
                onChange={(projects) => patch({ projects })}
                blank={BLANK_PROJECT}
                noun="Project"
                titleOf={(item) => item.title}
                renderFields={(item, update) => (
                  <>
                    <TextField label="Title" value={item.title} onChange={(title) => update({ title })} />
                    <TextArea label="Description" value={item.description} onChange={(description) => update({ description })} />
                    <TagInput value={item.technologies} onChange={(technologies) => update({ technologies })} />
                  </>
                )}
              />
            )}

            {tab === "contact" && (
              <div className={`${cardClass} space-y-5 p-4 sm:p-6`}>
                <TextField label="Address" value={draft.contact.address} onChange={(address) => patch({ contact: { ...draft.contact, address } })} />
                <TextField label="Phone" value={draft.contact.phoneNo} onChange={(phoneNo) => patch({ contact: { ...draft.contact, phoneNo } })} />
                <TextField label="Email" type="email" value={draft.contact.email} onChange={(email) => patch({ contact: { ...draft.contact, email } })} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
