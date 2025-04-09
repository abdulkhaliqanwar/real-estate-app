import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ currentUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      navigate("/login");
      window.location.reload();
    });
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">🏡 RealEstate App</Link>

      <div className="navbar-links">
        <Link to="/">All Properties</Link>
        <Link to="/bookings">Bookings</Link>

        {currentUser ? (
          <>
            <span>Welcome, {currentUser.username}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
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
