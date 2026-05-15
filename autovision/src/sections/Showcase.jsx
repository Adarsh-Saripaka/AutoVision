import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchCars, getCarImage } from "../Api/FetchApi";
import CarCardtemp from "./CarCardtemp";
import "./Showcase.css";

export default function Showcase() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const title = state?.brand || state?.hero?.brand || "Cars";
  const [cars, setCars] = useState([]);
  const [hero, setHero] = useState(state?.hero || null);
  const [images, setImages] = useState({});
  const [heroImage, setHeroImage] = useState("https://placehold.co/600x400/1C1C1C/00ffff?text=Axis+DriveWorks+Showroom");
  const [loading, setLoading] = useState(false);

  // Redirect if no data
  useEffect(() => {
    if (!title && !state?.hero) {
      navigate("/", { replace: true });
    }
  }, [title, state?.hero, navigate]);

  useEffect(() => {
    if (title) {
      setLoading(true);
      searchCars(title)
        .then((data) => {
          setCars(data);
          // If no hero was passed in navigation state, use the first result
          if (!state?.hero && data.length > 0) {
            setHero(data[0]);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [title, state?.hero]);

  // Sync state if it changes (e.g. nested navigation)
  useEffect(() => {
    if (state?.hero) {
      setHero(state.hero);
    }
  }, [state?.hero]);

  useEffect(() => {
    if (hero) {
      getCarImage(`${hero.brand} ${hero.model}`).then(setHeroImage);
    }
  }, [hero]);

  // Load all card images in parallel
  useEffect(() => {
    async function loadImages() {
      const entries = await Promise.all(
        cars.map(async (car) => {
          const key = `${car.brand}-${car.model}`;
          const url = await getCarImage(`${car.brand} ${car.model}`);
          return [key, url];
        })
      );
      setImages(Object.fromEntries(entries));
    }
    if (cars.length) loadImages();
  }, [cars]);

  const handleViewDetails = (car) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate("/showcase", {
      state: { hero: car, brand: title }
    });
  };

  const handleView3D = () => {
    if (!hero) return;
    navigate("/models", { state: { filterBrand: hero.brand } });
  };

  if (!title && !hero) return null;

  return (
    <div className="showcase loaded">
      <div className="showcase-top">
        <button className="back-btn" onClick={() => navigate(-1)}>← BACK</button>
        <h2>Axis DriveWorks</h2>
      </div>

      {hero && (
        <div className="showcase-main showcase-split">
          <div className="showcase-hero">
            <img src={heroImage} alt={hero.model} />
            <div className="hero-shadow" />
            <div className="hero-overlay">
              <h1>{hero.brand} {hero.model}</h1>
              <div className="hero-badges">
                <span>{hero.year}</span>
                <span>{hero.body_style}</span>
                <span>{hero.country_origin}</span>
              </div>

              <button className="view-3d-btn" onClick={handleView3D}>
                Interactive 3D Showroom
              </button>
            </div>
          </div>

          <div className="showcase-info">
            <div className="price-tag">
              <span className="label">MSRP</span>
              <h3 className="price">${Number(hero.msrp_usd).toLocaleString()}</h3>
            </div>
            
            <p className="subtitle">
              {hero.engine_type} Engine · {hero.transmission} · {hero.drivetrain}
            </p>

            <div className="spec-table">
              <Spec label="Horsepower" value={`${hero.horsepower} HP`} />
              <Spec label="Torque" value={`${hero.torque_nm} Nm`} />
              <Spec label="0–100 km/h" value={`${hero.zero_to_hundred_kmh}s`} />
              <Spec label="Top Speed" value={`${hero.top_speed_kmh} km/h`} />
              <Spec label="Cylinders" value={hero.cylinders} />
              <Spec label="Weight" value={`${hero.weight_kg} kg`} />
            </div>

            <button className="primary-btn" onClick={() => alert("Booking System Coming Soon!")}>Reserve for Test Drive</button>
          </div>
        </div>
      )}

      {cars.length > 0 && (
        <section className="more-models">
          <h2 className="section-title">Explore {title} Fleet</h2>
          <div className="car-grid">
            {cars.map((car, i) => (
              <CarCardtemp
                key={i}
                name={car.model}
                brand={car.brand}
                price={car.msrp_usd}
                feature={`${car.horsepower} HP`}
                image={images[`${car.brand}-${car.model}`]}
                onView={() => handleViewDetails(car)}
              />
            ))}
          </div>
        </section>
      )}

      {loading && (
        <div className="showcase-loading">
          <div className="loader"></div>
          <p>Analyzing Fleet Data...</p>
        </div>
      )}
    </div>
  );
}

const Spec = ({ label, value }) => (
  <div className="spec-row">
    <span>{label}</span>
    <b>{value}</b>
  </div>
);
