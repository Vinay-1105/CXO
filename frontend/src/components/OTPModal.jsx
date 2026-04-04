import React, { useState, useRef, useEffect } from "react";
import "./OTPModal.css";

const OTPModal = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", ""]);
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
    if (value && index < 3) {
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
    if (otpValue.length === 4) {
      onVerify(otpValue);
    } else {
      alert("Please enter all 4 digits");
    }
  };

  return (
    <div className="otp-modal-overlay">
      <form className="otp-Form" onSubmit={handleSubmit}>
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">We have sent a verification code to your email</p>

        <div className="inputContainer">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              required
              maxLength="1"
              type="text"
              className="otp-input"
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        <button className="verifyButton" type="submit">
          Verify
        </button>
        <button className="exitBtn" type="button" onClick={onClose}>
          ×
        </button>

        <p className="resendNote">
          Didn't receive the code?
          <button className="resendBtn" type="button" onClick={() => alert("Code resent!")}>
            Resend Code
          </button>
        </p>
      </form>
    </div>
  );
};

export default OTPModal;
