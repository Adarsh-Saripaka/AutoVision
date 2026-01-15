import { useParams, useNavigate } from "react-router-dom";
import CarCardtemp from "./CarCardtemp";
import "./BrandPage.css";

export default function BrandPage() {
  const { brand } = useParams();
  const navigate = useNavigate();

  const cars = carData.filter(car => car.brand === brand);

  return (
    <div className="brand-page">
      {/* HEADER */}
      <div className="brand-header">
        <h1 className="brand-title">{brand}</h1>
        <p className="brand-subtitle">
          Explore all {brand} models available in AutoVision
        </p>
      </div>

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
              image={`https://source.unsplash.com/600x400/?${car.brand}+${car.model}+car`}
              onView={() =>
                navigate("/showcase", {
                  state: { hero: car, list: cars }
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
