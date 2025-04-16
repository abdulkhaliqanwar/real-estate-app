
import { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import "./Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/bookings`, {
      credentials: "include",
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

  const handleDelete = (bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmDelete) return;

    fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      })
      .catch((err) => alert("Error deleting booking."));
  };

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
              <h2>{booking.property?.title}</h2>
              <img
                src={booking.property?.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
                alt="Property"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <p>Location: {booking.property?.location}</p>
              <p>Check-in: {new Date(booking.check_in).toLocaleDateString()}</p>
              <p>Check-out: {new Date(booking.check_out).toLocaleDateString()}</p>
              <p>Status: {booking.status || "Confirmed"}</p>
              <button onClick={() => handleDelete(booking.id)} className="delete-booking-btn">
                ❌ Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;