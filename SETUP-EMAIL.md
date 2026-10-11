# Orders & deploy (Resend)

`/order` submits to **`POST /api/order`**, which emails **`BOOKING_TO_EMAIL`** (default: `annaclaireweber33@gmail.com`) with order details and optional image attachments.

## Local

1. Copy `.env.example` → `.env.local`
2. Set `RESEND_API_KEY` from [resend.com](https://resend.com)
3. Set `RESEND_FROM_EMAIL` — for testing, `Art by Annaclaire <onboarding@resend.dev>` works with Resend’s sandbox (send **to the email on your Resend account** until you verify a domain)
4. Set `BOOKING_TO_EMAIL=annaclaireweber33@gmail.com`
5. `npm run dev` — submit a test order on `/order`

## Vercel

Add the same three variables in **Project → Settings → Environment Variables** (Production + Preview):

| Variable | Example |
|----------|---------|
| `RESEND_API_KEY` | `re_...` |
| `RESEND_FROM_EMAIL` | `"Art by Annaclaire <onboarding@resend.dev>"` |
| `BOOKING_TO_EMAIL` | `annaclaireweber33@gmail.com` |

Redeploy after saving env vars.

**Upload limits:** max **3MB per file**, **4MB total** per request (Vercel body limit).

## Production email

Verify a domain in Resend and set `RESEND_FROM_EMAIL` to e.g. `Art by Annaclaire <orders@yourdomain.com>` so mail delivers reliably to any inbox.
