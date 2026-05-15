import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchCars, getCarImage } from "../Api/FetchApi";
import CarCardtemp from "./CarCardtemp";
import "./BrandPage.css";

export default function BrandPage() {
  const { brand } = useParams();
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch cars for this brand from the backend API
  useEffect(() => {
    if (!brand) return;
    setLoading(true);
    searchCars(brand)
      .then(setCars)
      .finally(() => setLoading(false));
  }, [brand]);

  // Load images in parallel
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

  return (
    <div className="brand-page">
      {/* HEADER */}
      <div className="brand-header">
        <h1 className="brand-title">{brand}</h1>
        <p className="brand-subtitle">
          Explore all {brand} models available in Axis DriveWorks
        </p>
      </div>

      {loading && <p style={{ textAlign: "center", color: "#aaa" }}>Loading…</p>}

      {/* GRID */}
      <div className="brand-grid-wrapper">
        <div className="car-grid">
          {cars.map((car, i) => (
            <CarCardtemp
              key={i}
              name={car.model}
              brand={car.brand}
              price={car.msrp_usd}
              feature={`${car.horsepower} HP`}
              image={images[`${car.brand}-${car.model}`]}
              onView={() =>
                navigate("/showcase", {
                  state: { hero: car, brand: car.brand },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
