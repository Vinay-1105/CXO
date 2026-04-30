import React from "react";

const OTPInput = ({ otp, setOtp }) => {
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      {otp.map((digit, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          maxLength="1"
          className="w-12 h-12 text-center text-xl rounded-lg bg-black/30 border border-gray-500 focus:border-blue-400 outline-none"
        />
      ))}
    </div>
  );
};

export default OTPInput;