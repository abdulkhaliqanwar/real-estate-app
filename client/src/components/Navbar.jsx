import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
    window.location.reload(); // refresh navbar state
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">🏡 RealEstate App</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/properties">All Properties</Link>
        <Link to="/bookings">Bookings</Link>

        {currentUser?.username ? (
          <>
            {/* Show Dashboard for all logged-in users */}
            <Link to="/dashboard">Dashboard</Link>

            {/* ✅ Show Add Property for Admins */}
            {currentUser.role === "admin" && (
              <button
                onClick={() => navigate("/add-property")}
                style={{ backgroundColor: "green", color: "white" }}
              >
                + Add Property
              </button>
            )}

            {/* Greeting & Logout */}
            <span>Welcome, {currentUser.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="login-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
