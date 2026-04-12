import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "user@example.com",
    pass: process.env.SMTP_PASS || "password",
  },
});

export async function sendBroadcastEmail(to: string, subject: string, content: string, firstName?: string) {
  // Simple tag replacement
  const personalizedContent = content.replace(/\[FirstName\]/g, firstName || "there");

  const mailOptions = {
    from: `"Women Are Drugs" <${process.env.SMTP_FROM || "noreply@womenaredrugs.com"}>`,
    to,
    subject,
    text: personalizedContent,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #111;">
        <div style="text-align: center; padding: 40px 0;">
          <img src="https://womenaredrugs.com/brand/logo/wad-logo.png" alt="WAD" style="width: 200px;" />
        </div>
        <div style="padding: 20px;">
          ${personalizedContent.replace(/\n/g, '<br />')}
        </div>
        <div style="text-align: center; color: #888; font-size: 12px; padding: 40px 0; border-top: 1px solid #eee;">
          &copy; 2024 Women Are Drugs. All rights reserved.
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
