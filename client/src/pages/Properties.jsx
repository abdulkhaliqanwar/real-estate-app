import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "./Properties.css";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/properties`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch properties");
        return r.json();
      })
      .then((data) => {
        setProperties(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch Error:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading properties...</p>;

  return (
    <div className="properties-container">
      <div className="properties-header">
        <button 
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
        <h1>All Properties</h1>
        <button 
          className="add-property-btn"
          onClick={() => navigate("/add-property")}
        >
          + Add Property
        </button>
      </div>

      <div className="properties-grid">
        {properties.map((prop) => (
          <div key={prop.id} className="property-card">
            <img
              src={prop.image_url}
              alt={prop.title}
              className="property-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
            <div className="property-info">
              <h2>{prop.title}</h2>
              <p>{prop.location}</p>
              <p className="price">KES {new Intl.NumberFormat().format(prop.price)}</p>

              {/* ✅ Book Now Button */}
              <Link to={`/book/${prop.id}`}>
                <button className="book-btn">Book Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
