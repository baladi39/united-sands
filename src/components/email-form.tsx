"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const emailValue = formData.get("email") as string;
    const honeypot = formData.get("website") as string;

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, website: honeypot }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md text-center">
        <div className="rounded-lg border border-purple-400/30 bg-purple-900/20 px-6 py-4">
          <p
            className="text-lg text-white"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Thank you for joining!
          </p>
          <p
            className="mt-2 text-sm text-white/70"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Please check your email for confirmation.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-purple-400 underline hover:text-purple-300"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          Submit another email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 sm:flex-row"
    >
      {/* Honeypot field - hidden from real users, bots will fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] opacity-0"
      />

      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email here"
        className="flex-1 border-b-2 border-purple-400/50 bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition-colors focus:border-purple-400"
        data-electric-mute
        style={{ fontFamily: "var(--font-roboto)" }}
        required
        autoComplete="email"
        disabled={status === "loading"}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="px-8 py-3 text-sm font-medium tracking-wider text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          fontFamily: "var(--font-oswald)",
          background: "#9b59b6",
        }}
      >
        {status === "loading" ? "SENDING..." : "SUBMIT"}
      </button>

      {status === "error" && (
        <p
          className="absolute -bottom-8 left-0 text-sm text-red-400"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
