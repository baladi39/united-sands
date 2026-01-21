# Email Notification System – Setup Notes

## How It Works

When a visitor submits their email on the landing page:

1. **Notification email** is sent to `info@unitedsands.co` with the subscriber's email address and timestamp
2. **Confirmation email** is sent to the subscriber thanking them for joining

All emails are sent via **Resend** (using Amazon SES infrastructure).

---

## DNS Records Added to `unitedsands.co`

| Type | Host/Name          | Value                                              | Purpose                                      |
| ---- | ------------------ | -------------------------------------------------- | -------------------------------------------- |
| TXT  | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4G...` (DKIM key)      | DKIM signature for email authentication      |
| MX   | `send`             | `feedback-smtp.eu-west-1.amazonses.com` (priority 10) | Routes bounce/feedback emails to Amazon SES  |
| TXT  | `send`             | `v=spf1 include:amazonses.com ~all`                | SPF record to authorize Amazon SES           |

These records allow us to send emails **from** `@unitedsands.co` addresses (e.g., `no-reply@unitedsands.co`).

---

## ⚠️ Important Limitations

- **This is a temporary solution** for the "under renovation" landing page
- **Limit: 100 emails per day** on Resend's free tier (50 notifications + 50 confirmations = **50 signups/day max**)
- No database—subscriber list lives only in the notification emails sent to `info@unitedsands.co`

---

## For Production / Higher Volume

If signup volume exceeds ~50/day, consider:

- Upgrading Resend to a paid plan ($20/mo = 5,000 emails)
- Switching to a dedicated mailing list provider (Mailchimp, ConvertKit, etc.)
- Adding a lightweight database (Vercel KV, Supabase) to store emails

---

## Environment Variables

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `RESEND_API_KEY` | API key from https://resend.com/api-keys |

---

## Related Files

- [`src/app/api/join/route.ts`](../src/app/api/join/route.ts) – API route that sends both emails
- [`src/components/email-form.tsx`](../src/components/email-form.tsx) – Form component with honeypot spam protection
