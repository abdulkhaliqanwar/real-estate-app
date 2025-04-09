import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setCurrentUser }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "" },
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Invalid login");
        })
        .then((user) => {
          setCurrentUser(user);
          navigate("/");
        })
        .catch((err) => setError(err.message));
    },
  });

  return (
    <div className="login-container">
      <h2 className="login-title">🔐 Login</h2>

      <form onSubmit={formik.handleSubmit} className="login-form">
        <label>Username:</label>
        <input
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          required
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
