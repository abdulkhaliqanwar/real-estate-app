import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import "./Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/bookings`, {
      credentials: 'include'
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch bookings");
        return r.json();
      })
      .then((data) => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  if (isLoading) return <div className="loading">Loading bookings...</div>;

  return (
    <div className="bookings-container">
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h2>{booking.property.title}</h2>
              <p>Check-in: {new Date(booking.check_in).toLocaleDateString()}</p>
              <p>Check-out: {new Date(booking.check_out).toLocaleDateString()}</p>
              <p>Status: {booking.status || "Confirmed"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;