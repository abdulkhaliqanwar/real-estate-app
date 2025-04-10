import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import "./PropertyDetails.css";
import API_BASE_URL from "../config"; // Import the base URL

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/properties`)
      .then((r) => r.json())
      .then((data) => {
        const match = data.find((prop) => prop.id === parseInt(id));
        setProperty(match);
      });
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <img
        src={property.image_url}
        alt={property.title}
        className="details-image"
      />
      <h1 className="details-title">{property.title}</h1>
      <p className="details-location">{property.location}</p>
      <p className="details-price">KES {property.price}</p>

      <div className="details-booking-form">
        <BookingForm propertyId={property.id} userId={1} />
      </div>
    </div>
  );
}

export default PropertyDetails;
