import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import API_BASE_URL from "../config";
import "./Home.css";

function Home() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Fetch properties from the backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/properties`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch properties");
        return r.json();
      })
      .then(setProperties)
      .catch((err) => console.error("❌ Fetch Error:", err));
  }, []);

  return (
    <>
      <Hero />

      <div className="home-container">
        <h1 className="home-title">🏘️ Available Properties</h1>

        <div className="properties-grid">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="property-card"
              onClick={() => navigate(`/properties/${prop.id}`)}
            >
              <img
                src={prop.image_url}
                alt={prop.title}
                className="property-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
              <h2 className="property-title">{prop.title}</h2>
              <p className="property-location">{prop.location}</p>
              <p className="property-price">KES {prop.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
