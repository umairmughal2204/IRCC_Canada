import nodemailer from "nodemailer";

export async function sendOtpEmail(to: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "03104676590umary@gmail.com",  // your Gmail
      pass: "tkddvduqxtmpskhe",            // your 16-char Google App Password
    },
  });

  const mailOptions = {
    from: `"GCKey Canada" <03104676590umary@gmail.com>`,
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
    console.log(`✅ OTP email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw new Error("Error sending OTP email");
  }
}
