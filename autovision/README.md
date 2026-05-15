# Axis DriveWorks 🏎️

**The Ultimate Interactive 3D Automotive Encyclopedia**

Axis DriveWorks is a production-grade, full-stack web application designed for car enthusiasts and engineers. It combines a massive dataset of 150,000+ vehicles with high-fidelity 3D visualization and real-time customization.

---

## 🌟 Key Features

- **Interactive 3D Showroom:** High-performance GLTF rendering using **React Three Fiber** and **Draco Compression**.
- **Massive Data Engine:** Fast, keyword-optimized search across 150k+ vehicle records using an **Express.js** backend.
- **Dynamic Configuration:** Real-time part manipulation, color changes, and "Exploded Chassis" views.
- **Cinematic Visuals:** Intelligent image retrieval strategy fetching high-quality automotive photography via **Unsplash API**.
- **Modern Architecture:** Responsive CSS Grid layouts, Glassmorphic UI components, and smooth page transitions.

---

## 🛠️ Tech Stack

### Frontend
- **Core:** React 19 + Vite (Speed optimized)
- **3D Engine:** Three.js / React Three Fiber / @react-three/drei
- **Styling:** Vanilla CSS (Custom design system with 0 dependencies)
- **Routing:** React Router 7

### Backend
- **Server:** Node.js + Express
- **Data Processing:** In-memory CSV indexing for ultra-fast search results.
- **Security:** Integrated CORS, Rate Limiting, and Security Headers (Helmet-style).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Unsplash Access Key (for dynamic imagery)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   npm install --prefix ../autovision-backend
   ```
3. Create a `.env` file in the root with:
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_key_here
   ```
4. Start the full-stack app:
   ```bash
   npm run dev
   ```

---

## 📐 System Architecture

1. **The Crawler Engine:** The backend parses a 150k-row dataset on startup, creating a searchable index.
2. **The 3D Hub:** Models are dynamically loaded from a remote registry, matched with local material manifests for perfect texture application.
3. **The Visual Pipeline:** Front-end components use multi-stage fallback logic to ensure "no-broken-image" states, even for rare vintage models.

---

## 📈 Recruiter Note
This project demonstrates expertise in:
- **Performance Optimization:** Handling heavy 3D assets and large datasets without UI lag.
- **System Design:** Building a decoupled Frontend/Backend architecture.
- **UX Engineering:** Implementing complex state-driven animations and responsive layouts.

---

© 2025 Axis DriveWorks. Built with precision.
