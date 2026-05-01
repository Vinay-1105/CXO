import React, { useState, useRef, useEffect } from "react";


const OTPModal = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      onVerify(otpValue);
    } else {
      alert("Please enter all 6 digits");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <form className="w-80 bg-white flex flex-col items-center justify-center p-8 gap-5 rounded-xl shadow-lg relative animate-scale-up" onSubmit={handleSubmit}>
        <span className="text-xl font-bold mb-2">Enter OTP</span>
        <p className="text-gray-600 text-sm mb-2 text-center">We have sent a verification code to your email</p>

        <div className="flex gap-2 mb-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              required
              maxLength="1"
              type="text"
              className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg font-semibold"
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded transition" type="submit">
          Verify
        </button>
        <button className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700" type="button" onClick={onClose}>
          ×
        </button>

        <p className="text-xs text-gray-500 mt-2">Didn't receive the code?
          <button className="ml-1 text-teal-600 hover:underline" type="button" onClick={() => alert("Code resent!")}>
            Resend Code
          </button>
        </p>
      </form>
    </div>
  );
};

export default OTPModal;
