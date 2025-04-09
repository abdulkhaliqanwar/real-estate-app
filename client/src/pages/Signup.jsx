import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css"; // reuse your login styles

function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    onSubmit: (values) => {
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            navigate("/login"); // ✅ redirect after success
          } else {
            return res.json().then((err) => {
              setError(err.error || "Signup failed");
            });
          }
        });
    },
  });

  return (
    <div className="login-container">
      <h2 className="login-title">✍️ Sign Up</h2>

      <form onSubmit={formik.handleSubmit} className="login-form">
        <label>Username:</label>
        <input
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          required
        />

        <label>Email:</label>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;
