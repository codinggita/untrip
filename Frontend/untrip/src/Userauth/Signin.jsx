import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, User, Lock, Loader } from "lucide-react";
import '../css/signin.css'
const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const validateForm = () => {
    const errors = {};
    
    if (!isLogin && !formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const endpoint = isLogin
      ? "https://untrip.onrender.com/api/auth/login"
      : "https://untrip.onrender.com/api/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      const successMessage = isLogin ? "Welcome back!" : "Account created successfully!";
      alert(successMessage);
      
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="untrip-auth__container">
      <div className="untrip-auth__card">
        <h1 className="untrip-auth__title">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="untrip-auth__subtitle">
          {isLogin 
            ? "Please enter your details to sign in" 
            : "Please fill in the information below"}
        </p>

        {error && (
          <div className="untrip-auth__error-message">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="untrip-auth__form">
          {!isLogin && (
            <div className="untrip-auth__form-group">
              <label htmlFor="name" className="untrip-auth__label">
                Name
              </label>
              <div className="untrip-auth__input-wrapper">
                <User className="untrip-auth__input-icon" size={18} />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`untrip-auth__input ${
                    validationErrors.name ? "untrip-auth__input--error" : ""
                  }`}
                />
              </div>
              {validationErrors.name && (
                <span className="untrip-auth__error-text">
                  {validationErrors.name}
                </span>
              )}
            </div>
          )}

          <div className="untrip-auth__form-group">
            <label htmlFor="email" className="untrip-auth__label">
              Email
            </label>
            <div className="untrip-auth__input-wrapper">
              <Mail className="untrip-auth__input-icon" size={18} />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`untrip-auth__input ${
                  validationErrors.email ? "untrip-auth__input--error" : ""
                }`}
              />
            </div>
            {validationErrors.email && (
              <span className="untrip-auth__error-text">
                {validationErrors.email}
              </span>
            )}
          </div>

          <div className="untrip-auth__form-group">
            <label htmlFor="password" className="untrip-auth__label">
              Password
            </label>
            <div className="untrip-auth__input-wrapper">
              <Lock className="untrip-auth__input-icon" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`untrip-auth__input ${
                  validationErrors.password ? "untrip-auth__input--error" : ""
                }`}
              />
              <button
                type="button"
                className="untrip-auth__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {validationErrors.password && (
              <span className="untrip-auth__error-text">
                {validationErrors.password}
              </span>
            )}
          </div>

          {isLogin && (
            <div className="untrip-auth__forgot-password">
              <a href="/forgot-password" className="untrip-auth__forgot-link">
                Forgot password?
              </a>
            </div>
          )}

          <button 
            type="submit" 
            className="untrip-auth__submit-button"
            disabled={loading}
          >
            {loading ? (
              <span className="untrip-auth__loading-wrapper">
                <Loader className="untrip-auth__spinner" size={20} />
                Processing...
              </span>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        <div className="untrip-auth__footer">
          <p className="untrip-auth__toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="untrip-auth__toggle-button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setValidationErrors({});
                setFormData({ name: "", email: "", password: "" });
              }}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;