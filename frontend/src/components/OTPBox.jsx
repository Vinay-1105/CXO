import { useState, useEffect } from "react";
import OTPInput from "./OTPInput";

const OTPBox = ({ email, role, onSuccess }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  // ⏱ Timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔑 VERIFY OTP
  const handleVerify = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp: otp.join(""),
        role,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      onSuccess();
    } else {
      alert(data.error);
    }

    setLoading(false);
  };

  // 🔁 RESEND
  const resendOtp = async () => {
    await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setTimer(30);
  };

  return (
    <div className="mt-6 text-center">
      <h3 className="text-white text-lg">Enter OTP</h3>

      <OTPInput otp={otp} setOtp={setOtp} />

      <button
        onClick={handleVerify}
        className="mt-4 px-6 py-2 bg-blue-500 rounded-lg"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <div className="mt-3 text-sm text-gray-400">
        {timer > 0 ? (
          <span>Resend in {timer}s</span>
        ) : (
          <button onClick={resendOtp} className="text-blue-400">
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPBox;