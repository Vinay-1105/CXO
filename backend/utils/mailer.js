import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

export const sendOtpMail = async (email, otp) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
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

  if (error) {
    throw error;
  }
  return data;
};

export const sendMagicLinkMail = async (email, magicLink) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Sign in to CXOConnect",
    html: `
      <div style="font-family:sans-serif; text-align:center; padding: 40px; background-color: #f9fafb;">
        <div style="background-color: white; padding: 40px; border-radius: 8px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome to CXOConnect</h2>
          <p style="color: #4b5563; margin-bottom: 30px; font-size: 16px;">Click the button below to sign in to your account. This link will expire shortly.</p>
          <a href="${magicLink}" style="background-color: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">Sign In to Dashboard</a>
          <p style="color: #9ca3af; margin-top: 30px; font-size: 12px;">If you didn't request this email, you can safely ignore it.</p>
        </div>
      </div>
    `,
  });

  if (error) {
    throw error;
  }
  return data;
};