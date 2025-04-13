import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1 className="hero-title">Find Your Dream Property</h1>
        <p className="hero-subtitle">Explore stunning real estate listings across Kenya</p>
        <button 
          className="hero-button"
          onClick={() => window.scrollTo({
            top: document.querySelector('.home-container').offsetTop,
            behavior: 'smooth'
          })}
        >
          View Properties
        </button>
      </div>
    </section>
  );
}

export default Hero;
