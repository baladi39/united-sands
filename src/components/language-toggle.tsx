"use client";

import { useLang } from "@/lib/i18n/language-context";

// Shared EN / AR switch used in the nav and the menu overlay.
export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      className={`flex items-center gap-1 text-xs tracking-[0.2em] font-oswald ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={
          lang === "en"
            ? "text-white"
            : "text-white/40 transition-colors hover:text-white/70"
        }
      >
        {t.langEn}
      </button>
      <span className="text-white/30">/</span>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={
          lang === "ar"
            ? "text-white"
            : "text-white/40 transition-colors hover:text-white/70"
        }
      >
        {t.langAr}
      </button>
    </div>
  );
}
