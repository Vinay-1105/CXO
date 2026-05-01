import { useState, useEffect } from "react";
import OTPInput from "./OTPInput";
import { supabase } from "@/lib/supabaseClient";

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

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp.join(""),
      type: "email",
    });

    if (error) {
      alert(error.message);
    } else {
      onSuccess();
    }

    setLoading(false);
  };

  // 🔁 RESEND
  const resendOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert(error.message);
    } else {
      setTimer(30);
    }
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