import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PropertyDetails.css";
import API_BASE_URL from "../config";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/properties/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch property");
        return r.json();
      })
      .then(setProperty)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [id]);

  if (error) return <p className="error">{error}</p>;
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
      <p className="details-price">KES {new Intl.NumberFormat().format(property.price)}</p>
    </div>
  );
}

export default PropertyDetails;
