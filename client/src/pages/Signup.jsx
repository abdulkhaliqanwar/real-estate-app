import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css"; // New shared auth styles

function Signup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "" // Added password field
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          navigate("/login", { 
            state: { success: "Account created successfully! Please login." }
          });
        } else {
          const err = await res.json();
          setError(err.error || "Signup failed. Please try again.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join our community today</p>

        <form onSubmit={formik.handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              placeholder="Create a password"
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;