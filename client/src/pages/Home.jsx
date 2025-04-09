import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import "./Home.css";

function Home() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then(setProperties);
  }, []);

  return (
    <>
      <Hero /> {/* ✅ Add Hero banner at the top */}

      <div className="home-container">
        <h1 className="home-title">🏘️ Available Properties</h1>
        <div className="properties-grid">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="property-card"
              onClick={() => navigate(`/properties/${prop.id}`)}
            >
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
