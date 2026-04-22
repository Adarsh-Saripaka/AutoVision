import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Hero from "./sections/Hero";
import Footer from "./sections/Footer";
import Search from "./sections/Search";
import Showcase from "./sections/Showcase";
import BrandCard from "./sections/BrandCard";
import BrandPage from "./sections/BrandPage";
import ModelsLibrary from "./viewer/ModelsLibrary";
import ViewerPage from "./viewer/ViewerPage";

const Home = ({ onSearch }) => {
  const navigate = useNavigate();

  const bodyStyles = [
    { name: "Sedan", icon: "🚗" },
    { name: "SUV", icon: "🚙" },
    { name: "Coupe", icon: "🏎️" },
    { name: "Hatchback", icon: "🚗" },
    { name: "Convertible", icon: "🚖" }
  ];

  return (
    <div className="app-container">
      {/* TASKBAR */}
      <header className="taskbar">
        <div className="logo_title">
          <img src="/Logo.png" alt="AutoVision Logo" className="logo" />
          <h1 className="title">AutoVision</h1>
        </div>

        <Search onSearch={onSearch} />

        <div className="nav_right">
          <div className="navlinks">
            <a
              href="/models"
              onClick={(e) => {
                e.preventDefault();
                navigate('/models');
              }}
            >
              3D Models Explorer
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="homepage">
        <Hero />
      </div>

      {/* BODY STYLES */}
      <p className="section-title">Explore by Category</p>

      <section id="categories" className="brands-section">
        <div className="brand-grid">
          {bodyStyles.map((style) => (
            <div 
              key={style.name} 
              className="brand-card" 
              onClick={() => navigate(`/showcase`, { state: { brand: style.name } })}
              style={{ cursor: 'pointer' }}
            >
              <span style={{ fontSize: '2rem' }}>{style.icon}</span>
              <p>{style.name}</p>
            </div>
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
    if (!Array.isArray(results) || results.length === 0) {
      alert("No cars found matching your search.");
      return;
    }

    // Direct to showcase with the first result
    navigate("/showcase", {
      state: { hero: results[0], brand: results[0].brand }
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Home onSearch={handleSearch} />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="/brand/:brand" element={<BrandPage />} />
      <Route path="/models" element={<ModelsLibrary />} />
      <Route path="/viewer" element={<ViewerPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      color: "#fff",
      fontFamily: "sans-serif",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "72px", margin: 0, color: "#00ffff" }}>404</h1>
      <p style={{ fontSize: "22px", color: "#aaa", marginTop: "12px" }}>Page not found</p>
      <a
        href="/"
        style={{
          marginTop: "28px",
          padding: "14px 36px",
          border: "2px solid #00ffff",
          borderRadius: "30px",
          color: "#fff",
          textDecoration: "none",
          fontSize: "16px",
          transition: "background 0.3s ease"
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(0,255,255,0.15)"}
        onMouseLeave={(e) => e.target.style.background = "transparent"}
      >
        ← Back to Home
      </a>
    </div>
  );
}