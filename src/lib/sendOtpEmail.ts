// lib/sendOtpEmail.ts
import nodemailer from "nodemailer";

export async function sendOtpEmail(to: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",  // You can replace with another email service if needed
    auth: {
      user: process.env.EMAIL_dUSER!, // your email address
      pass: process.env.EMAIL_PASS!, // your email app password or credentials
    },
  });

  const mailOptions = {
    from: `"GCKey Canada" <${process.env.EMAIL_dUSER}>`,
    to,
    subject: "GCKey One-Time Passcode from Canada 🇨🇦",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #1a73e8;">GCKey One-Time Passcode</h2>
        <p>Hello,</p>
        <p>Your one-time passcode (OTP) is:</p>
        <h1 style="color: #2E86C1;">${otp}</h1>
        <p>This code will expire in <b>10 minutes</b>. Please do not share it with anyone.</p>
        <br/>
        <p>Thank you,<br/>Government of Canada</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw new Error("Error sending OTP email");
  }
}
