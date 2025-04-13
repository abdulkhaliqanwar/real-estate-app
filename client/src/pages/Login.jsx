import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";

function Login({ setCurrentUser }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: { 
      username: "",
      password: "" 
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        });

        if (res.ok) {
          const user = await res.json();
          setCurrentUser(user);
          navigate(location.state?.from || "/");
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        {location.state?.success && (
          <div className="auth-success">{location.state.success}</div>
        )}
        <p className="auth-subtitle">Please enter your details</p>

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
            <label>Password</label>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;