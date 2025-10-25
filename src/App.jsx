import React from "react";
import "./App.css";
import Hero from "./sections/Hero";
import CarCardtemp from "./sections/CarCardtemp";
import carData from "./cardata/car.json";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <div className="app-container">
      <section>
        <div className="taskbar">
          <div className="logo_title">
            <img src='/Logo.png' alt="Logo" className='logo' />
            <h1 className='title'>AutoVision</h1>
          </div>
          <div className="navlinks">
            <a href="#home">Home</a>
            <a href="#cars">Cars</a>
            <a href="#reviews">Reviews</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </section>

      <div className="homepage">
        <Hero />
      </div>

      <p className="section-title">Our Collection</p>

      <section id="cars" className="cars-section">
        <div className="car-grid">
          {carData.map((car) => (
            <CarCardtemp
              key={car.id}
              name={car.name}
              brand={car.brand}
              price={car.price}
              feature={car.feature}
              image={car.image}
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
