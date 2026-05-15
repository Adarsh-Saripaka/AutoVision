# 🏎️ Axis DriveWorks: Frontend

**High-Performance 3D Automotive Configurator**

This is the frontend repository for **Axis DriveWorks**, a production-grade 3D car configurator built with React, Three.js, and Vite.

---

## 🚀 Core Technologies

- **React 19:** Utilizing the latest concurrent rendering features for smooth UI transitions.
- **Three.js & React Three Fiber:** Powering the immersive 3D experience with optimized GLTF loading and material shaders.
- **Vite:** Next-generation frontend tooling for lightning-fast development and optimized production builds.
- **Vanilla CSS:** A custom design system leveraging modern CSS features (Variables, Grid, Flexbox) for a zero-dependency, high-performance UI.

---

## 🎨 Interactive Features

- **Real-time Customization:** Instant feedback on color changes, material swaps (Matte vs Gloss), and wheel configurations.
- **Exploded View Engine:** An interactive animation system that breaks down car components to show chassis and internal engineering.
- **Dynamic Camera Systems:** Cinematic orbital controls with smooth damping and intelligent auto-focus.
- **Glassmorphic UI:** A premium, semi-transparent user interface designed for maximum visual impact and readability.

---

## 🛠️ Development Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in this directory:
```env
VITE_API_URL=http://localhost:3000 # Backend API URL
VITE_UNSPLASH_ACCESS_KEY=your_key  # For high-res background imagery
```

### 4. Start Development Server
```bash
npm run dev
```

---

## 📐 Frontend Architecture

The frontend is structured into modular layers:
- **`/components`:** Atomic UI elements and complex dashboard widgets.
- **`/components/canvas`:** Three.js specific components (Lights, Models, Environment).
- **`/hooks`:** Custom React hooks for state management and 3D interactions.
- **`/styles`:** Modular CSS files following a consistent design token system.

---

## 📉 Optimization Techniques

- **Draco Mesh Compression:** Reducing 3D model sizes by up to 70% for faster load times.
- **Texture Compression:** Efficient handling of 4K textures using compressed formats.
- **Conditional Rendering:** Only loading heavy 3D assets when they are in view.
- **Debounced Inputs:** Ensuring UI interactions don't bottleneck the 3D rendering loop.

---

© 2025 Axis DriveWorks. Part of the AutoVision Ecosystem.
