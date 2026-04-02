import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

export const sendOtpMail = async (email, otp) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family:sans-serif">
        <h2>Your OTP: ${otp}</h2>
        <p>This expires in 5 minutes</p>
      </div>
    `,
  });
};