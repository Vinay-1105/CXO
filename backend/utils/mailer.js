import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

export const sendOtpMail = async (email, otp) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const otpDisplay = otp.toString().split('').map(digit => 
    '<span style="display: inline-block; width: 45px; height: 45px; line-height: 45px; text-align: center; background-color: #70938A; color: white; border-radius: 50%; font-size: 24px; font-weight: bold; margin: 0 4px;">' + digit + '</span>'
  ).join('');

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "CXOConnect - OTP Verification",
    html: `
      <div style="font-family: sans-serif; background-color: #FAF9F6; padding: 40px 20px;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #000000; border-radius: 8px; padding: 40px;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; vertical-align: middle; width: 40px; height: 40px; background-color: #70938A; border-radius: 50%; color: white; font-weight: bold; font-size: 20px; line-height: 40px;">C</div>
            <h1 style="display: inline-block; vertical-align: middle; color: #1f2937; margin: 0 0 0 10px; font-size: 24px; letter-spacing: 1px;">CXO CONNECT</h1>
          </div>
          
          <!-- Content -->
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">Dear Applicant,</p>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
            Please use the One Time Verification code to validate your registered email ID and proceed to complete your application.
          </p>
          
          <!-- OTP Display -->
          <div style="text-align: center; margin-bottom: 30px;">
            ${otpDisplay}
          </div>
          
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin-bottom: 40px; text-align: center;">
            Above OTP will remain active for <strong>05:00 minutes</strong> only. Do not share this OTP with anyone.
          </p>
          
          <!-- Footer -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <p style="color: #4b5563; font-size: 14px; margin: 0 0 10px 0;">Best regards,<br>CXO Connect Team</p>
            <a href="https://cxoconnect.com" style="color: #004AAD; text-decoration: none; font-size: 14px; font-weight: bold;">CXO Connect</a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
              This is an auto-generated email. Do not reply to this email.
            </p>
          </div>
        </div>
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
    subject: "CXOConnect - Secure Sign In",
    html: `
      <div style="font-family: sans-serif; background-color: #FAF9F6; padding: 40px 20px;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #000000; border-radius: 8px; padding: 40px;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; vertical-align: middle; width: 40px; height: 40px; background-color: #70938A; border-radius: 50%; color: white; font-weight: bold; font-size: 20px; line-height: 40px;">C</div>
            <h1 style="display: inline-block; vertical-align: middle; color: #1f2937; margin: 0 0 0 10px; font-size: 24px; letter-spacing: 1px;">CXO CONNECT</h1>
          </div>
          
          <!-- Content -->
          <h2 style="color: #000000; font-size: 22px; font-weight: bold; margin-bottom: 20px; text-align: center;">Let's get you signed in</h2>
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 30px; text-align: center;">
            Sign in with the secure link below :
          </p>
          
          <!-- Button -->
          <div style="text-align: center; margin-bottom: 40px;">
            <a href="${magicLink}" style="background-color: #70938A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block;">Sign in to CXO</a>
          </div>
          
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin-bottom: 40px; text-align: center;">
            Above link will remain active for <strong>10 hours</strong> only.
          </p>
          
          <!-- Footer -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <p style="color: #4b5563; font-size: 14px; margin: 0 0 10px 0;">Best regards,<br>CXO Connect Team</p>
            <a href="https://cxoconnect.com" style="color: #004AAD; text-decoration: none; font-size: 14px; font-weight: bold;">CXO Connect</a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
              If you didn't request this email, you can safely ignore it.
            </p>
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    throw error;
  }
  return data;
};