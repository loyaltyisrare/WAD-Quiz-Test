# Master Blueprint: Brand Replication Guide

Use this document to replicate the "Loyalty Test" app architecture for a new brand. This guide covers the assets, content, and technical settings needed to spin up a high-converting quiz app in a single session.

## 1. Summary of Completed Innovations
We have successfully built a full-stack marketing powerhouse:
- **Story Controller**: A dedicated "Content Creator Mode" for recording social media content with forced outcomes and high-res results.
- **Broadcast Center**: A complete CRM and email engine allowing you to schedule bulk emails, manage leads, and export data for Meta/Google ads.
- **Premium Admin Dashboard**: A clean, authenticated interface for tracking conversions, lead growth, and email delivery status.
- **Conversion-Optimized Quiz**: High-fidelity Framer Motion animations, "selection lockout" to prevent accidental clicks, and an aggressive lead-capture gate.

---

## 2. New Brand: What I Need From You
To build another version of this app for a new brand, please provide the following:

### A. Branding Assets
- **Logo (High-Res)**: One multi-colored or "streetwear" style logo (like "Loyalty is Rare") and one script version for dark backgrounds.
- **Brand Colors**:
  - `Background`: (e.g., Pure Black, Dark Navy)
  - `Primary Accent`: (e.g., LIR Purple, Fire Red)
  - `Button Color`: (e.g., Tan/Beige #d6d3c1)
- **Visual Motif**: (e.g., floating red hearts, dripping paint, neon lines).

### B. The Quiz Content
- **Main Hook**: The "Question" that drives people to the test (e.g., "Which one are you: Solid or Switch?").
- **Questions (6–8)**: Situational questions with 4 answers (A, B, C, D) mapped to a scale of 1–4 points.
- **Result Bands**: 4 distinct loyalty "profiles" (e.g., "Rare Loyalty," "Self First") with custom colors and taglines.

### C. The Offer & Leads
- **Lead Capture Incentives**: What gift or offer are we promising? (e.g., "Get a $100 Gift Card").
- **Social Handles**: Do we need Instagram, TikTok, or Twitter handles?
- **Shop Links**: Final destination links for the "Result" page buttons.

### D. Technical Setup
- **Database**: A fresh Neon Postgres connection string.
- **SMTP**: Sender email and credentials for the Broadcast Center.
- **Admin Password**: A custom password for the `/admin` login.

---

## 3. Quick-Start Checklist for New Chats
When you start a new conversation to build the next brand, just copy-paste this prompt:

> "I want to build a new version of the Loyalty Test for a new brand called [BRAND NAME]. Use the same architecture from the LIR-Quiz-Test project (Admin Dashboard, Broadcast Center, Story Controller, Lead Gate). 
> 
> Here are my assets:
> - Logo: [Link/Attachment]
> - Colors: [Hex Codes]
> - Content: [Questions/Answers]
> - Database: [Neon URL]"

---

## 4. Maintenance & Support
- **Lead Exports**: Access `/admin` to export CSVs for upload to Facebook Ads Manager as a "Lookalike Audience."
- **Email Scheduling**: Use the Broadcast Center to send re-marketing offers to users who finished the quiz but didn't buy.
- **Story Creation**: Use `/quiz/social` whenever you need a fresh recording with a specific percentage.

**Loyalty is Rare. Your tech is now Ready.**
