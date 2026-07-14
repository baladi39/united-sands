import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure this route runs on the server (not static export).
export const runtime = "nodejs";

function escape(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    const {
      name,
      company,
      email,
      description,
      servicesLabels = [],
      meetingLabel,
      timelineLabel,
      heardLabel,
      lang,
      website, // honeypot
    } = body ?? {};

    // Honeypot: bots fill hidden fields. Pretend success without sending.
    if (website) return NextResponse.json({ ok: true });

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 },
      );
    }

    const services = Array.isArray(servicesLabels)
      ? servicesLabels.join(", ")
      : "";

    const rows: [string, unknown][] = [
      ["Name", name],
      ["Company", company],
      ["Email", email],
      ["Description", description],
      ["Services", services],
      ["Preferred meeting", meetingLabel],
      ["Project timeline", timelineLabel],
      ["Heard about us", heardLabel],
      ["Submitted in", lang === "ar" ? "Arabic" : "English"],
    ];

    const text = rows
      .map(([k, v]) => `${k}: ${v || "-"}`)
      .join("\n");
    const html = `
      <h2>New Project Request</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:600">${escape(k)}</td><td>${escape(
                v,
              ) || "-"}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="color:#888">Time: ${new Date().toISOString()}</p>
    `;

    await resend.emails.send({
      from: "United Sands <no-reply@unitedsands.co>",
      to: "info@unitedsands.co",
      replyTo: typeof email === "string" ? email.trim() : undefined,
      subject: `New Project Request: ${name || email}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Request project email error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
