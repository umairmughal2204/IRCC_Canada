import nodemailer from "nodemailer";
import path from "path";

export async function sendOtpEmail(to: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "03104676590umary@gmail.com", // your Gmail
      pass: "tkddvduqxtmpskhe",           // your Google App Password
    },
  });

  const mailOptions = {
    from: `"Government of Canada" <03104676590umary@gmail.com>`,
    to,
    subject: "Verify your login - Government of Canada",
    html: `
<div lang="en-CA" style="font-family:'Roboto',Helvetica,Arial,Tahoma,sans-serif;margin:0;padding:0">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0" style="border-collapse:collapse;width:100%!important;height:100%!important;margin:0;padding:0">
    <tr>
      <td align="center" valign="top">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;height:100%;border-collapse:collapse">
          <tr><td style="padding:20px"></td></tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" valign="top">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;height:100%;border:thin solid #424242;border-collapse:collapse">
          
          <!-- Header -->
          <tr bgcolor="#005b99">
            <td align="center" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
                <tr>
                  <td align="center" valign="top" style="color:#ffffff;padding:20px">
                    <img src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms.png" alt="Canada" width="160" style="width:160px;border:0 none;height:auto;line-height:100%;vertical-align:top;outline:none;text-decoration:none">
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
<tr bgcolor="#ffffff">
  <td align="center" valign="top" style="padding-top:22px;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
      <tr>
        <td align="center" valign="top" style="color:#333333;padding:20px 40px 0">
          <h1 style="font-size:36px;font-weight:400;margin:0;">Verify your login</h1>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Divider line -->
<tr bgcolor="#ffffff">
  <td align="center" valign="top" style="padding-top:22px;">
    <table border="0" cellpadding="0" cellspacing="0" width="20%" style="border-collapse:collapse">
      <tr>
        <td align="center" valign="top" style="padding:0 40px 20px;border-bottom:thin solid #424242"></td>
      </tr>
    </table>
  </td>
</tr>


          <!-- Main Content -->
          <tr bgcolor="#ffffff">
            <td align="left" valign="top" style="padding-top:20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
                <tr>
                  <td align="left" valign="top" style="color:#333333;font-size:18px;font-weight:400;padding:20px 40px">
                    <p>Your one-time passcode to log in to your Government of Canada service is:</p>
                    <div align="center">
                      <p style="color:#005b99;font-size:36px;font-weight:bold;word-wrap:break-word;word-break:break-word;margin:20px 0;">${otp}</p>
                    </div>
                    <p>This email was sent to <a href="mailto:${to}" target="_blank" style="color:#005b99;text-decoration:none;">${to}</a>.</p>
                    <p>You received this email because you signed up for a Government of Canada login account.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr bgcolor="#424242">
            <td align="left" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
                <tr>
                  <td align="left" valign="top" style="color:#ffffff;font-size:18px;font-weight:400;padding:20px 40px">
                    <p style="margin:0">Please do not reply to this email.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>

    <tr>
      <td align="center" valign="top">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;height:100%;border-collapse:collapse">
          <tr><td style="padding:20px"></td></tr>
        </table>
      </td>
    </tr>
  </table>
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
