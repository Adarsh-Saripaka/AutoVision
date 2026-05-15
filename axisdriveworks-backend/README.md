# ⚙️ Axis DriveWorks: Backend

**High-Performance Search API & Data Engine**

This is the backend service for **Axis DriveWorks**, responsible for managing a massive automotive dataset and serving real-time search results to the frontend.

---

## 🚀 Core Technologies

- **Node.js:** Scalable runtime for high-concurrency data processing.
- **Express.js:** Lightweight web framework for building robust RESTful APIs.
- **In-Memory Indexing:** Optimized for ultra-fast keyword searches across 150,000+ records.
- **CORS & Helmet:** Production-grade security middleware for cross-origin protection.

---

## 🛠️ API Documentation

### **Search Vehicles**
- **Endpoint:** `GET /api/search`
- **Query Params:** `q` (Search query)
- **Description:** Returns a list of vehicles matching the keywords. Optimized for partial matches and brand-specific filtering.

### **Model Metadata**
- **Endpoint:** `GET /api/models`
- **Description:** Retrieves the mapping for 3D assets and material configurations.

---

## 📐 Backend Architecture

1. **Data Ingestion:** On startup, the server parses the `vehicles.csv` dataset.
2. **Indexing:** A search-optimized index is built in-memory to ensure response times under 50ms.
3. **Registry Linking:** The backend maps static data to dynamic 3D model URLs stored in the registry.

---

## 🛠️ Development Setup

### 1. Prerequisites
- Node.js (v18 or higher)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in this directory:
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 4. Start Server
```bash
node server.js
```

---

## 🔒 Security & Performance

- **Rate Limiting:** Protects the API from brute-force search requests.
- **CORS Configuration:** Strictly enforced for production domains (Render).
- **Zero-Dependency Search:** Custom search algorithm designed for maximum speed without heavy database overhead.

---

© 2025 Axis DriveWorks. Part of the AutoVision Ecosystem.
