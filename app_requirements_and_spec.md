# Product Requirements Document (PRD): Social Quiz & CRM Platform

## 1. Project Overview
A high-converting, social-media-first quiz platform built for luxury streetwear brands. The app combines a gamified personality test with a professional CRM and broadcast email engine.

---

## 2. Core Modules

### A. Quiz Engine (Client-Side)
- **Framework**: Next.js (App Router), Framer Motion for transitions.
- **Scoring Logic**: 
  - 6–8 situational questions.
  - Answers are weighed (e.g., A=4pts, D=1pt).
  - Score maps to 4 "Loyalty Bands" (Green, Orange, Yellow, Red).
- **UX Guardrails**: 
  - **Selection Lockout**: A 500ms mandatory delay after any click to prevent double-selection or accidental skips.
  - **Animated Presence**: `popLayout` mode to handle smooth entry/exit of question cards.

### B. Story Controller (Social Mode)
- **Path**: `/quiz/social`.
- **Function**: Allows creators to pre-select a quiz score (0–100%) and color band via a slider.
- **Logic**: The quiz questions are displayed to look authentic for screen recordings, but the final result is **forced** to the pre-selected outcome regardless of user input.

### C. Lead Capture & Gate
- **Validation**: Zod-based validation (`leadSchema`).
- **High-Conversion Copy**:
  - **Social Handle**: Text removed "(optional)" to encourage higher entry.
  - **Phone Number**: Placeholder incentivized with "Optional - Add for a free gift 🎁".
- **Tracking**: Integrated custom event tracking for lead submissions.

### D. Admin Dashboard & CRMBROADCAST
- **Authentication**: Password-protected (`/admin`).
- **Lead Management**: Real-time view of all submissions with "Bulk Export" for Facebook Lookalike Audiences.
- **Broadcast Center**:
  - **Email Engine**: Integrated SMTP support for bulk marketing.
  - **Scheduling**: Ability to queue emails for future dispatch.
  - **Delivery Logs**: Tracking of `emailed_at` and `scheduled_email_at` for every lead.

---

## 3. Technical Architecture

### A. Database (Postgres/Neon)
- **Self-Healing Schema**: The `lib/db/client.ts` contains `initPostgresDb` which automatically creates tables and adds missing columns (`ALTER TABLE`) to ensure zero-downtime migrations.
- **Tables**:
  - `leads`: Stores PII, score, tracking data, and email status.
  - `broadcast_delivery`: Logs sent messages.

### B. Email & Cron Jobs
- **API Endpoint**: `/api/cron/send-scheduled-emails`.
- **Infrastructure**: Designed to run via Vercel Cron or similar ping service to check the queue every 1–5 minutes.

---

## 4. UI/UX Specifications
- **Theme**: Premium Dark Mode.
- **Colors**:
  - Background: `#000000` (Deep Black).
  - Brand Red: `#F33939`.
  - Button Tan/Beige: `#d6d3c1`.
- **Motif**: Floating, glowing red hearts (`lucide-react` or custom SVG).
- **Responsive**: Mobile-first design optimized for "In-App Browsers" (Instagram/TikTok/Twitter).

---

## 5. Replication Checklist
To replicate this project in a new environment:
1.  **Environment Variables**: `DATABASE_URL`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `ADMIN_PASSWORD`.
2.  **Public Assets**: Ensure `logo.png` and `header-logo.png` are in `/public`.
3.  **Content Config**: Update `content/quiz.config.ts` for the main test and `content/socialQuiz.ts` for the social version.

---

## 6. Known "Gotchas"
- **Next.js 15+ Params**: Result pages must `await params` for dynamic segments (e.g., `[score]`).
- **Pointer Events**: Ensure `pointer-events-none` is applied during transitions to avoid UI race conditions.
