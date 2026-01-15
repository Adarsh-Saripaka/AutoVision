import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Hero from "./sections/Hero";
import Footer from "./sections/Footer";
import Search from "./sections/Search";
import Showcase from "./sections/Showcase";
import BrandCard from "./sections/BrandCard";

const Home = ({ onSearch }) => {
  const navigate = useNavigate();

  const brands = ["BMW", "Audi", "Mercedes", "Porsche", "Honda"];

  return (
    <div className="app-container">
      {/* TASKBAR */}
      <header className="taskbar">
        <div className="logo_title">
          <img src="/Logo.png" alt="Logo" className="logo" />
          <h1 className="title">AutoVision</h1>
        </div>

        <Search onSearch={onSearch} />

        <div className="nav_right">
          <div className="navlinks">
            <a
              href="#brands"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("brands")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Models
            </a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="homepage">
        <Hero />
      </div>

      {/* BRANDS */}
      <p className="section-title">Explore Brands</p>

      <section id="brands" className="brands-section">
        <div className="brand-grid">
          {brands.map((brand, i) => (
            <BrandCard
              key={i}
              brand={brand}
              onClick={() =>
                navigate("/showcase", {
                  state: { brand }
                })
              }
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default function App() {
  const navigate = useNavigate();

  const handleSearch = (results, query) => {
    if (!results || results.length === 0) return;

    const q = query.toLowerCase().trim();

    const isBrandSearch =
      results.length > 1 &&
      results.every(car => car.brand.toLowerCase() === q);

    navigate("/showcase", {
      state: {
        hero: results[0],
        list: isBrandSearch ? results : [],
        mode: isBrandSearch ? "brand" : "model"
      }
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Home onSearch={handleSearch} />} />
      <Route path="/showcase" element={<Showcase />} />
    </Routes>
  );
}
