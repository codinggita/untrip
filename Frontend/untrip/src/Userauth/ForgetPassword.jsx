import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, Loader, Send, CheckCircle, KeyRound } from "lucide-react";
import '../css/signin.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = (type) => {
    const errors = {};
    
    if (type === 'email') {
      if (!email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Please enter a valid email";
      }
    }

    if (type === 'otp') {
      if (!otp.trim()) {
        errors.otp = "OTP is required";
      } else if (otp.length !== 6) {
        errors.otp = "OTP must be 6 digits";
      }
    }

    if (type === 'password') {
      if (!newPassword) {
        errors.password = "Password is required";
      } else if (newPassword.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm('email')) return;
    
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://untrip.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");

      setMessage("OTP has been sent to your email");
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!validateForm('otp')) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://untrip.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid OTP");

      setMessage("OTP verified successfully");
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!validateForm('password')) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://untrip.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reset password");

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = () => {
    switch(step) {
      case 1: return <Send className="untrip-auth__step-icon" size={24} />;
      case 2: return <CheckCircle className="untrip-auth__step-icon" size={24} />;
      case 3: return <KeyRound className="untrip-auth__step-icon" size={24} />;
      default: return null;
    }
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return "Forgot Password";
      case 2: return "Verify OTP";
      case 3: return "Reset Password";
      default: return "";
    }
  };

  return (
    <div className="untrip-auth__container">
      <div className="untrip-auth__card">
        <button
          onClick={() => navigate("/signin")}
          className="untrip-auth__back-button"
          type="button"
        >
          <ArrowLeft size={20} />
          Back to Login
        </button>

        <div className="untrip-auth__header">
          {getStepIcon()}
          <h1 className="untrip-auth__title">{getStepTitle()}</h1>
        </div>
        
        {error && <div className="untrip-auth__error-message">{error}</div>}
        {message && <div className="untrip-auth__success-message">{message}</div>}

        <div className="untrip-auth__steps">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`untrip-auth__step ${step >= num ? 'untrip-auth__step--active' : ''}`}
            />
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="untrip-auth__form">
            <div className="untrip-auth__form-group">
              <label htmlFor="email" className="untrip-auth__label">
                Email Address
              </label>
              <div className={`untrip-auth__input-wrapper ${validationErrors.email ? 'untrip-auth__input-wrapper--error' : ''}`}>
                <Mail className="untrip-auth__input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationErrors.email) {
                      setValidationErrors({ ...validationErrors, email: '' });
                    }
                  }}
                  placeholder="Enter your email"
                  className="untrip-auth__input"
                />
              </div>
              {validationErrors.email && (
                <span className="untrip-auth__error-text">{validationErrors.email}</span>
              )}
            </div>
            <button
              type="submit"
              className="untrip-auth__submit-button"
              disabled={loading}
            >
              {loading ? (
                <span className="untrip-auth__loading-wrapper">
                  <Loader className="untrip-auth__spinner" size={20} />
                  Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpVerification} className="untrip-auth__form">
            <div className="untrip-auth__form-group">
              <label htmlFor="otp" className="untrip-auth__label">
                Enter OTP
              </label>
              <div className={`untrip-auth__input-wrapper ${validationErrors.otp ? 'untrip-auth__input-wrapper--error' : ''}`}>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                    setOtp(value);
                    if (validationErrors.otp) {
                      setValidationErrors({ ...validationErrors, otp: '' });
                    }
                  }}
                  placeholder="Enter 6-digit OTP"
                  className="untrip-auth__input untrip-auth__input--otp"
                  maxLength={6}
                />
              </div>
              {validationErrors.otp && (
                <span className="untrip-auth__error-text">{validationErrors.otp}</span>
              )}
            </div>
            <button
              type="submit"
              className="untrip-auth__submit-button"
              disabled={loading}
            >
              {loading ? (
                <span className="untrip-auth__loading-wrapper">
                  <Loader className="untrip-auth__spinner" size={20} />
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="untrip-auth__form">
            <div className="untrip-auth__form-group">
              <label htmlFor="newPassword" className="untrip-auth__label">
                New Password
              </label>
              <div className={`untrip-auth__input-wrapper ${validationErrors.password ? 'untrip-auth__input-wrapper--error' : ''}`}>
                <Lock className="untrip-auth__input-icon" size={18} />
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (validationErrors.password) {
                      setValidationErrors({ ...validationErrors, password: '' });
                    }
                  }}
                  placeholder="Enter new password"
                  className="untrip-auth__input"
                />
              </div>
              {validationErrors.password && (
                <span className="untrip-auth__error-text">{validationErrors.password}</span>
              )}
            </div>
            <button
              type="submit"
              className="untrip-auth__submit-button"
              disabled={loading}
            >
              {loading ? (
                <span className="untrip-auth__loading-wrapper">
                  <Loader className="untrip-auth__spinner" size={20} />
                  Resetting Password...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;