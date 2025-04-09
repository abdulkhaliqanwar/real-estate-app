import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>🏡 RealEstate App</p>
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </div>

      <div className="footer-right">
        <Link to="/">Home</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/login">Login</Link>
      </div>
    </footer>
  );
}

export default Footer;
