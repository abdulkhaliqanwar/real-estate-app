import { useEffect, useState } from "react";
import "./Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then(setBookings);
  }, []);

  function updateBookingDate(id, field, value) {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, [field]: value } : b
    );
    setBookings(updated);

    fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
  }

  function deleteBooking(id) {
    fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    }).then(() => {
      setBookings(bookings.filter((b) => b.id !== id));
    });
  }

  return (
    <div className="bookings-container">
      <h1 className="bookings-title">📅 My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <p><strong>Property ID:</strong> {b.property_id}</p>
            <p><strong>User ID:</strong> {b.user_id}</p>

            <p>
              <strong>Check-in:</strong>
              <input
                type="date"
                value={b.check_in}
                onChange={(e) =>
                  updateBookingDate(b.id, "check_in", e.target.value)
                }
              />
            </p>

            <p>
              <strong>Check-out:</strong>
              <input
                type="date"
                value={b.check_out}
                onChange={(e) =>
                  updateBookingDate(b.id, "check_out", e.target.value)
                }
              />
            </p>

            <button
              className="cancel-btn"
              onClick={() => deleteBooking(b.id)}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Bookings;
