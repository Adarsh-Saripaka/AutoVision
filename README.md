# 🏎️ AutoVision: Axis DriveWorks

**An Interactive 3D Car Configurator and Search Tool**

AutoVision (Axis DriveWorks) is a full-stack web application that allows users to search through a vehicle database and interact with 3D car models. It was built to explore the integration of large datasets with web-based 3D rendering.

---

## 🛠️ Project Overview

This project consists of a **React frontend** and a **Node.js backend**. The primary goal is to provide a functional interface where users can search for cars and customize 3D models in real-time.

### Core Features:
- **3D Viewer:** Interact with car models (rotate, zoom) and change paint colors dynamically.
- **Vehicle Search:** A search bar that queries the backend to find vehicle details from a CSV dataset.
- **Dynamic Assets:** 3D models and high-resolution images (via Unsplash API) are loaded based on user selection.
- **Responsive UI:** A dashboard designed with custom CSS for various screen sizes.

---

## 💻 Tech Stack

### **Frontend (`/axisdriveworks`)**
- **React 19:** Functional components and hooks for UI and state logic.
- **Three.js & React Three Fiber:** Renders the 3D car models and manages the scene.
- **Vite:** Development server and build tool.
- **Vanilla CSS:** Custom styling for the dashboard and interface.

### **Backend (`/axisdriveworks-backend`)**
- **Node.js & Express:** Handles API requests and serves vehicle data.
- **CSV Data Processing:** Reads from a vehicle dataset to provide search results.
- **CORS:** Configured for communication with the frontend on Render.

---

## 🚀 Setup and Installation

### 1. Backend Setup
```bash
cd axisdriveworks-backend
npm install
node server.js
```

### 2. Frontend Setup
```bash
cd axisdriveworks
npm install
# Create a .env file with VITE_API_URL and VITE_UNSPLASH_ACCESS_KEY
npm run dev
```

---

## 📁 Project Structure
- `axisdriveworks/`: The React application and 3D rendering logic.
- `axisdriveworks-backend/`: The Express server and vehicle dataset.
- `README.md`: Main project documentation.

---

## 📝 Project Status
Developed as a portfolio piece to demonstrate full-stack 3D integration. The application is configured for deployment on Render.

---

© 2025 Axis DriveWorks. Developed by Adarsh Saripaka.
