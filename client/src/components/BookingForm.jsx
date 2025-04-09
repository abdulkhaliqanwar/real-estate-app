import { useFormik } from "formik";
import "./BookingForm.css";

function BookingForm({ propertyId, userId }) {
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
          alert("Booking successful!");
          resetForm();
        })
        .catch(() => {
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
