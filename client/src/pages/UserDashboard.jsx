// File: client/src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import "./UserDashboard.css";

function UserDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser.id) return;

    fetch(`${API_BASE_URL}/api/users/${currentUser.id}/dashboard`, {
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch dashboard data");
        return r.json();
      })
      .then((data) => {
        setBookings(data.bookings || []);
        setFavorites(data.favorites || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      });
  }, [currentUser.id]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h1>👤 {currentUser.username}'s Dashboard</h1>

      <section className="dashboard-section">
        <h2>📅 My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul className="dashboard-list">
            {bookings.map((booking) => (
              <li key={booking.id} className="dashboard-card">
                <h3>{booking.property?.title || "[No Title]"}</h3>
                <p>
                  {booking.check_in} → {booking.check_out}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-section">
        <h2>❤️ My Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorite properties.</p>
        ) : (
          <ul className="dashboard-list">
            {favorites.map((property) => (
              <li key={property.id} className="dashboard-card">
                <h3>{property.title}</h3>
                <p>{property.location}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default UserDashboard;
