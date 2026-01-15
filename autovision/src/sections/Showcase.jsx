import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchCars, getCarImage } from "../Api/FetchApi";
import CarCardtemp from "./CarCardtemp";
import "./Showcase.css";

export default function Showcase() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const brand = state?.brand || null;
  const hero = state?.hero || null;

  const [cars, setCars] = useState([]);
  const [images, setImages] = useState({});
  const [heroImage, setHeroImage] = useState("/default-car.jpg");

  /* FETCH BRAND CARS */
  useEffect(() => {
    if (brand) {
      searchCars(brand).then(setCars);
    }
  }, [brand]);

  /* FETCH HERO IMAGE */
  useEffect(() => {
    if (hero) {
      getCarImage(`${hero.brand} ${hero.model}`).then(setHeroImage);
    }
  }, [hero]);

  /* FETCH GRID IMAGES */
  useEffect(() => {
    async function loadImages() {
      const imgs = {};
      for (const car of cars) {
        imgs[`${car.brand}-${car.model}`] =
          await getCarImage(`${car.brand} ${car.model}`);
      }
      setImages(imgs);
    }
    if (cars.length > 0) loadImages();
  }, [cars]);

  const handleViewDetails = (car) => {
    navigate("/showcase", {
      state: {
        hero: car,
        brand: car.brand
      }
    });
  };

  if (!brand && !hero) {
    navigate("/");
    return null;
  }

  return (
    <div className="showcase loaded">
      {/* TOP BAR */}
      <div className="showcase-top">
        <h2>AutoVision</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      {/* 🔥 DETAIL VIEW */}
      {hero && (
        <div className="showcase-main showcase-split">
          {/* IMAGE */}
          <div className="showcase-hero">
            <img src={heroImage} alt={hero.model} />
            <div className="hero-shadow" />
            <div className="hero-overlay">
              <h1>{hero.brand} {hero.model}</h1>
              <p>{hero.year} · {hero.body_style}</p>
            </div>
          </div>

          {/* 🔥 DETAILS PANEL */}
          <div className="showcase-info">
            <h3 className="price">${hero.msrp_usd}</h3>

            <p className="subtitle">
              {hero.engine_type} · {hero.transmission} · {hero.drivetrain}
            </p>

            <div className="spec-table">
              <Spec label="Horsepower" value={`${hero.horsepower} HP`} />
              <Spec label="Torque" value={`${hero.torque_nm} Nm`} />
              <Spec label="0–100 km/h" value={`${hero.zero_to_hundred_kmh}s`} />
              <Spec label="Top Speed" value={`${hero.top_speed_kmh} km/h`} />
              <Spec label="Fuel Type" value={hero.fuel_type} />
              <Spec label="Cylinders" value={hero.cylinders} />
              <Spec label="Seats" value={hero.seats} />
              <Spec label="Doors" value={hero.doors} />
              <Spec label="Weight" value={`${hero.weight_kg} kg`} />
            </div>

            <button className="primary-btn">Configure Yours</button>
          </div>
        </div>
      )}

      {/* 🔥 BRAND GRID VIEW */}
      {brand && !hero && (
        <section className="more-models">
          <h2 className="section-title">{brand} Models</h2>

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
    </div>
  );
}

const Spec = ({ label, value }) => (
  <div className="spec-row">
    <span>{label}</span>
    <b>{value}</b>
  </div>
);
