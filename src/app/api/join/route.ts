import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure this route runs on the server (not static export)
export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, website } = await req.json();

    // Honeypot check – bots typically fill hidden fields
    if (website) {
      // Silently reject but return success to not tip off bots
      return NextResponse.json({ ok: true });
    }

    // Basic email validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 },
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Send notification to support team
    await resend.emails.send({
      from: "United Sands <no-reply@unitedsands.co>",
      to: "info@unitedsands.co",
      subject: "New Mailing List Signup",
      text: `A new user wants to join the mailing list:\n\nEmail: ${trimmedEmail}\nTime: ${new Date().toISOString()}`,
      html: `
        <h2>New Mailing List Signup</h2>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `,
    });

    // Send confirmation to subscriber
    await resend.emails.send({
      from: "United Sands <no-reply@unitedsands.co>",
      to: trimmedEmail,
      subject: "Welcome to United Sands",
      text: `Thank you for joining our mailing list!\n\nWe're currently working on something amazing and you'll be the first to know when we launch.\n\nBest regards,\nThe United Sands Team`,
      html: `
        <h2>Thank you for joining United Sands!</h2>
        <p>We're currently working on something amazing and you'll be the first to know when we launch.</p>
        <br>
        <p>Best regards,<br>The United Sands Team</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
