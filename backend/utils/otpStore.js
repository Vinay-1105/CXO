// utils/otpStore.js

const otpStore = new Map();

export const saveOtp = (email, otp) => {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 min
  });
};

export const verifyOtp = (email, otp) => {
  const record = otpStore.get(email);

  if (!record) return false;
  if (Date.now() > record.expiresAt) return false;

  return record.otp === otp;
};