import React, { useState } from "react";
import "./App.css";

import Hero from "./sections/Hero";
import CarCardtemp from "./sections/CarCardtemp.jsx";
import carData from "./cardata/car.json";
import Footer from "./sections/Footer.jsx";
import Search from "./sections/Search.jsx";

const App = () => {
  const [cars, setCars] = useState(carData);

  const handleSearch = (results) => {
    if (results && results.length > 0) {
      setCars(results);
    }
  };

  return (
    <div className="app-container">
      <header className="taskbar">
        <div className="logo_title">
          <img src="/Logo.png" alt="Logo" className="logo" />
          <h1 className="title">AutoVision</h1>
        </div>

        <Search onSearch={handleSearch} />

        <div className="nav_right">
          <div className="navlinks">
            <a href="#home">Home</a>
            <a href="#cars">Cars</a>
            <a href="#reviews">Reviews</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      <div className="homepage" id="home">
        <Hero />
      </div>

      <p className="section-title">Our Collection</p>

      <section id="cars" className="cars-section">
        <div className="car-grid">
          {cars.map((car, index) => (
            <CarCardtemp
              key={index}
              name={car.model || car.name}
              brand={car.brand || "AutoVision"}
              price={car.msrp_usd ? "$" + car.msrp_usd : car.price}
              feature={car.horsepower ? car.horsepower + " HP" : car.feature}
              image={
                car.image ||
                `https://source.unsplash.com/600x400/?${car.brand}+${car.model}+car`
              }
            />
          ))}
        </div>
      </section>

      <footer>
        <div className="footer">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default App;
