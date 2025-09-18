import React, { useRef, useState, useEffect } from 'react';


export default function VerifyOTP({ length = 6, onSubmit = (code) => {}, resendDelay = 30 }) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(resendDelay);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    setSecondsLeft(resendDelay);
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendDelay]);

  const focusInput = (index) => {
    const el = inputsRef.current[index];
    if (el) el.focus();
  };

  const handleChange = (e, idx) => {
    const raw = e.target.value;
    const char = raw.replace(/[^0-9]/g, '');
    if (!char) return;

    if (char.length > 1) {
      const nextVals = [...values];
      let i = idx;
      for (const c of char) {
        if (i >= length) break;
        nextVals[i] = c;
        i++;
      }
      setValues(nextVals);
      const nextIndex = Math.min(idx + char.length, length - 1);
      focusInput(nextIndex);
      return;
    }

    const next = [...values];
    next[idx] = char;
    setValues(next);
    if (idx < length - 1) focusInput(idx + 1);
  };

  const handleKeyDown = (e, idx) => {
    const key = e.key;
    if (key === 'Backspace') {
      if (values[idx]) {
        const next = [...values];
        next[idx] = '';
        setValues(next);
      } else if (idx > 0) {
        focusInput(idx - 1);
        const next = [...values];
        next[idx - 1] = '';
        setValues(next);
      }
      e.preventDefault();
    } else if (key === 'ArrowLeft' && idx > 0) {
      focusInput(idx - 1);
      e.preventDefault();
    } else if (key === 'ArrowRight' && idx < length - 1) {
      focusInput(idx + 1);
      e.preventDefault();
    } else if (key === 'Enter') {
      submitCode();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboard = (e.clipboardData || window.clipboardData).getData('text');
    const digits = clipboard.replace(/[^0-9]/g, '').slice(0, length);
    if (!digits) return;
    const next = Array(length).fill('');
    for (let i = 0; i < digits.length; i++) next[i] = digits[i];
    setValues(next);
    const focusIndex = Math.min(digits.length, length - 1);
    focusInput(focusIndex);
  };

  const submitCode = async () => {
    const code = values.join('');
    if (code.length < length) {
      const wrapper = document.getElementById('otp-wrapper');
      if (wrapper) {
        wrapper.classList.remove('animate-shake');
        void wrapper.offsetWidth;
        wrapper.classList.add('animate-shake');
        setTimeout(() => wrapper.classList.remove('animate-shake'), 600);
      }
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(code);
    } catch (err) {
      console.error(err);
    }
    setIsSubmitting(false);
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(resendDelay);
    setValues(Array(length).fill(''));
    focusInput(0);
  };

  return (
    <div className="otp-container">
      <div id="otp-wrapper" className="otp-box">
        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-subtitle">Enter the {length}-digit code sent to your phone</p>

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
            disabled={isSubmitting}
            className="otp-btn verify"
          >
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </button>

          <button
            onClick={handleResend}
            disabled={secondsLeft > 0}
            className="otp-btn resend"
          >
            {secondsLeft > 0 ? `Resend (${secondsLeft}s)` : 'Resend'}
          </button>
        </div>

        <p className="otp-note">Didn’t receive the code? Check spam or try another number.</p>
      </div>
    </div>
  );
}
