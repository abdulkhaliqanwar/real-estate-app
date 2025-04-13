import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>🏡 RealEstate App</p>
        <p>Contact us: support@realestateapp.com</p>
        <p>Phone: +254 700 123 456</p>
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
