import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

function BookingPage() {
  const { id } = useParams();
  
  // ✅ Fix: add null check
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.id) {
    return <p>Please login to book this property.</p>;
  }
  

  return (
    <div className="booking-page">
      <h2>Book This Property</h2>
      <BookingForm propertyId={id} userId={currentUser.id} />
    </div>
  );
}

export default BookingPage;
