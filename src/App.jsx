import React from 'react'
import './App.css'
import Hero from './components/Hero'
const App = () => {
  return (
    <div>
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
      <div className="homepage">
          <Hero />
      </div>
    </div>
  )
}

export default App
