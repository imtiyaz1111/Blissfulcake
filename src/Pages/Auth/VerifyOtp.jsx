import React, { useRef, useState, useEffect } from "react";
import { verifyOtp, resendOtp } from "../../Api/functions/authFunctions"; // ✅ make sure resendOtp exists in backend
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyOTP({ length = 6 }) {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();

  const [secondsLeft, setSecondsLeft] = useState(60); // 1 min timer

  // keep references updated
  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  // start countdown
  useEffect(() => {
    if (secondsLeft === 0) return; // stop when time is up
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const focusInput = (index) => {
    const el = inputsRef.current[index];
    if (el) el.focus();
  };

  const handleChange = (e, idx) => {
    const raw = e.target.value;
    const char = raw.replace(/[^0-9]/g, "");
    if (!char) return;

    const next = [...values];
    next[idx] = char;
    setValues(next);
    if (idx < length - 1) focusInput(idx + 1);
  };

  const handleKeyDown = (e, idx) => {
    const key = e.key;
    if (key === "Backspace") {
      const next = [...values];
      if (values[idx]) {
        next[idx] = "";
        setValues(next);
      } else if (idx > 0) {
        next[idx - 1] = "";
        setValues(next);
        focusInput(idx - 1);
      }
      e.preventDefault();
    } else if (key === "ArrowLeft" && idx > 0) {
      focusInput(idx - 1);
      e.preventDefault();
    } else if (key === "ArrowRight" && idx < length - 1) {
      focusInput(idx + 1);
      e.preventDefault();
    } else if (key === "Enter") {
      submitCode();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboard = (e.clipboardData || window.clipboardData).getData("text");
    const digits = clipboard.replace(/[^0-9]/g, "").slice(0, length);
    if (!digits) return;
    const next = Array(length).fill("");
    for (let i = 0; i < digits.length; i++) next[i] = digits[i];
    setValues(next);
    const focusIndex = Math.min(digits.length, length - 1);
    focusInput(focusIndex);
  };

  const submitCode = async () => {
    const code = values.join("");
    if (code.length < length) {
      // shake animation when OTP incomplete
      const wrapper = document.getElementById("otp-wrapper");
      if (wrapper) {
        wrapper.classList.remove("animate-shake");
        void wrapper.offsetWidth;
        wrapper.classList.add("animate-shake");
        setTimeout(() => wrapper.classList.remove("animate-shake"), 600);
      }
      return;
    }
    setIsLoading(true);
    try {
      const newData = { otp: code, email };
      await verifyOtp(newData, navigate, setIsLoading, email);
    } catch (err) {
      console.error("OTP verification failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email }); // ✅ call resend API
      setValues(Array(length).fill("")); // clear inputs
      setSecondsLeft(60); // restart 1 min timer
      focusInput(0); // focus first input
    } catch (err) {
      console.error("Resend OTP failed", err);
    }
  };

  return (
    <div className="otp-container">
      <div id="otp-wrapper" className="otp-box">
        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-subtitle">
          Enter the {length}-digit code sent to your email ({email})
        </p>

        <div className="otp-inputs">
          {Array.from({ length }).map((_, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={values[idx]}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              aria-label={`Digit ${idx + 1}`}
              className="otp-input"
            />
          ))}
        </div>

        <div className="otp-actions">
          <button
            onClick={submitCode}
            disabled={isLoading}
            className="otp-btn verify"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>

          {secondsLeft > 0 ? (
            <button disabled className="otp-btn resend">
              Resend ({secondsLeft}s)
            </button>
          ) : (
            <button onClick={handleResend} className="otp-btn resend">
              Resend OTP
            </button>
          )}
        </div>

        <p className="otp-note">
          Didn’t receive the code? Check spam or try another email.
        </p>
      </div>
    </div>
  );
}
