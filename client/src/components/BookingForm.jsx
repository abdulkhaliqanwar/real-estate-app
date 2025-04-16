import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

import "./BookingForm.css";

function BookingForm({ propertyId, userId }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      check_in: "",
      check_out: "",
    },
    onSubmit: (values, { resetForm }) => {
      const bookingData = {
        ...values,
        property_id: propertyId,
        user_id: userId,
      };

      console.log("📤 Sending booking data:", bookingData);
      if (!userId) {
        alert("User ID missing. Please log in again.");
        return;
      }
      

      fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Booking failed.");
          return res.json();
        })
        .then(() => {
          resetForm();
          navigate("/bookings");
        })
        .catch((err) => {
          console.error("❌ Booking error:", err);
          alert("Something went wrong. Try again.");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="booking-form">
      <div>
        <label htmlFor="check_in">Check-in:</label>
        <input
          type="date"
          id="check_in"
          name="check_in"
          onChange={formik.handleChange}
          value={formik.values.check_in}
          required
        />
      </div>

      <div>
        <label htmlFor="check_out">Check-out:</label>
        <input
          type="date"
          id="check_out"
          name="check_out"
          onChange={formik.handleChange}
          value={formik.values.check_out}
          required
        />
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
}

export default BookingForm;
