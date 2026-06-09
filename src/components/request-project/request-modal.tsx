"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";
import { enLabel, type Option } from "@/lib/i18n/dictionary";

type Status = "idle" | "loading" | "success" | "error";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  description: "",
  services: [] as string[],
  meeting: "",
  timeline: "",
  heard: "",
};

export default function RequestModal() {
  const { t, dir } = useLang();
  const { open, closeForm } = useRequestProject();

  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Pause smooth scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    const lenis = (
      window as unknown as { lenis?: { stop: () => void; start: () => void } }
    ).lenis;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeForm]);

  // Reset back to a blank form a moment after closing.
  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => {
      setForm(emptyForm);
      setStatus("idle");
      setError("");
    }, 400);
    return () => window.clearTimeout(id);
  }, [open]);

  function toggleService(id: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.email.includes("@")) {
      setStatus("error");
      setError(t.formEmailInvalid);
      return;
    }
    setStatus("loading");
    setError("");

    const honeypot = (
      e.currentTarget.elements.namedItem("website") as HTMLInputElement | null
    )?.value;

    try {
      const res = await fetch("/api/request-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // Send English labels too so the team email is language-neutral.
          servicesLabels: form.services.map((id) => enLabel("formServices", id)),
          meetingLabel: form.meeting && enLabel("formMeeting", form.meeting),
          timelineLabel: form.timeline && enLabel("formTimeline", form.timeline),
          heardLabel: form.heard && enLabel("formHeard", form.heard),
          website: honeypot,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t.formError);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.formError);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-4 py-10 md:py-16"
          dir={dir}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t.formClose}
            onClick={closeForm}
            className="absolute inset-0 cursor-default bg-[#07050f]/80 backdrop-blur-md"
          />

          <motion.div
            className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#120e22] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.6)] md:p-10"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 rounded-t-2xl bg-[radial-gradient(ellipse_at_top,rgba(133,86,195,0.25),transparent_70%)]" />

            <button
              type="button"
              onClick={closeForm}
              aria-label={t.formClose}
              className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-white/40 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="relative py-10 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12.5l4.5 4.5L19 7"
                      stroke="var(--gold-light)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="font-inter text-2xl text-white">
                  {t.formSuccessTitle}
                </h2>
                <p className="mt-2 text-sm text-white/65">{t.formSuccessBody}</p>
                <button
                  type="button"
                  onClick={closeForm}
                  className="mt-7 rounded-full border border-white/20 bg-white/5 px-7 py-2.5 text-xs tracking-[0.2em] text-white/80 transition hover:bg-white/10 font-inter"
                >
                  {t.formClose}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0"
                />

                <header className="mb-7">
                  <p className="mb-2 text-[10px] tracking-[0.35em] text-[var(--gold-light)]/80 font-inter">
                    {t.navRequest}
                  </p>
                  <h2 className="font-inter text-3xl font-light text-white">
                    {t.formTitle}
                  </h2>
                  <p className="mt-2 text-sm text-white/60">{t.formSubtitle}</p>
                </header>

                {/* Contact info */}
                <SectionLabel>{t.formContactInfo}</SectionLabel>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label={t.formName}
                    name="name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    required
                  />
                  <Field
                    label={t.formCompany}
                    name="company"
                    value={form.company}
                    onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                  />
                  <Field
                    label={t.formEmail}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    required
                  />
                  <Field
                    label={t.formDescription}
                    name="description"
                    value={form.description}
                    onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                  />
                </div>

                {/* Services (multi-select) */}
                <SectionLabel className="mt-8">{t.formServicesQ}</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {t.formServices.map((opt) => (
                    <Pill
                      key={opt.id}
                      active={form.services.includes(opt.id)}
                      onClick={() => toggleService(opt.id)}
                    >
                      {opt.label}
                    </Pill>
                  ))}
                </div>

                {/* Meeting timeline (single) */}
                <SectionLabel className="mt-8">{t.formMeetingQ}</SectionLabel>
                <PillRow
                  options={t.formMeeting}
                  value={form.meeting}
                  onSelect={(id) => setForm((f) => ({ ...f, meeting: id }))}
                />

                {/* Project timeline (single) */}
                <SectionLabel className="mt-8">{t.formTimelineQ}</SectionLabel>
                <PillRow
                  options={t.formTimeline}
                  value={form.timeline}
                  onSelect={(id) => setForm((f) => ({ ...f, timeline: id }))}
                />

                {/* How heard (single) */}
                <SectionLabel className="mt-8">{t.formHeardQ}</SectionLabel>
                <PillRow
                  options={t.formHeard}
                  value={form.heard}
                  onSelect={(id) => setForm((f) => ({ ...f, heard: id }))}
                />

                {error && (
                  <p className="mt-6 text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-8 w-full rounded-full bg-gradient-to-r from-[var(--purple-accent)] to-[var(--gold)] px-8 py-3.5 text-xs font-medium tracking-[0.25em] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 font-inter"
                >
                  {status === "loading" ? t.formSending : t.formSubmit}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mb-3 text-[11px] uppercase tracking-[0.3em] text-white/45 font-inter ${className}`}
    >
      {children}
    </p>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={
          type === "email" ? "email" : name === "name" ? "name" : "off"
        }
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[var(--purple-light)]/60 focus:bg-white/[0.05]"
      />
    </label>
  );
}

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-xs tracking-wide transition ${
        active
          ? "border-[var(--gold)]/60 bg-[var(--gold)]/15 text-[var(--gold-light)]"
          : "border-white/12 bg-white/[0.03] text-white/65 hover:border-white/30 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function PillRow({
  options,
  value,
  onSelect,
}: {
  options: Option[];
  value: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Pill
          key={opt.id}
          active={value === opt.id}
          onClick={() => onSelect(value === opt.id ? "" : opt.id)}
        >
          {opt.label}
        </Pill>
      ))}
    </div>
  );
}
