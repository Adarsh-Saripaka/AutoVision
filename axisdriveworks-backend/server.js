import express from "express";
import csv from "csvtojson";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Security & middleware ---
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      process.env.FRONTEND_URL, // Dynamic URL for Render deployment
    ].filter(Boolean),
  })
);

// Simple in-memory rate limiter (per IP, 60 req/min)
const rateMap = new Map();
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60_000;

app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { start: now, count: 1 });
    return next();
  }

  entry.count++;
  if (entry.count > RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests. Try again later." });
  }
  next();
});

// Basic security headers
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

const fs = require("fs");
const readline = require("readline");

// --- Data ---
let cars = [];
let dataReady = false;

// ULTRA-OPTIMIZED: Manual line-by-line parsing to save RAM
async function loadCarData() {
  const filePath = "./data/cardata.csv";
  if (!fs.existsSync(filePath)) {
    console.error("❌ Critical: CSV file not found at", filePath);
    return;
  }

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let isHeader = true;
  let headers = [];
  let count = 0;

  console.log("⏳ Starting ultra-efficient stream load...");

  for await (const line of rl) {
    if (!line.trim()) continue; // Skip empty lines

    const values = line.split(",").map(v => v.trim());
    
    if (isHeader) {
      // Strip BOM and clean headers
      headers = values.map(h => h.replace(/^\uFEFF/, "").trim());
      isHeader = false;
      console.log("📍 Headers detected (cleaned):", headers);
      continue;
    }

    // Map only essential fields to keep memory footprint tiny
    const car = {};
    headers.forEach((h, i) => {
      const cleanHeader = h.toLowerCase().trim();
      if (["brand", "model", "year", "body_style", "msrp_usd", "horsepower"].includes(cleanHeader)) {
        car[cleanHeader] = values[i] ? values[i].replace(/^"|"$/g, "").trim() : "";
      }
    });
    
    car.id = count++;
    cars.push(car);

    // Print a sample of the first car to verify loading
    if (count === 1) {
      console.log("🔍 Sample Data Loaded:", JSON.stringify(car));
    }
  }

  dataReady = true;
  console.log(`✅ Success: ${cars.length} cars indexed. Ready for search.`);
}

loadCarData();

// --- Routes ---

app.get("/", (req, res) => {
  res.json({
    name: "Axis DriveWorks API",
    version: "1.0.0",
    status: dataReady ? "operational" : "loading",
    endpoints: {
      search: "/api/search?q={query}",
      details: "/api/car/{id}",
      brands: "/api/brands",
      health: "/health"
    }
  });
});

app.get("/health", (req, res) => {
  if (dataReady) {
    res.status(200).send("OK");
  } else {
    res.status(503).send("Service Unavailable - Loading Data");
  }
});

app.get("/api/brands", (req, res) => {
  if (!dataReady) return res.status(503).json({ error: "Loading" });
  const uniqueBrands = [...new Set(cars.map(c => c.brand))].sort();
  res.json(uniqueBrands);
});

app.get("/api/search", (req, res) => {
  if (!dataReady) {
    return res.status(503).json({ error: "Data is still loading. Please retry shortly." });
  }

  const raw = (req.query.q || "").toLowerCase().trim();

  // Validate: reject empty or excessively long queries
  if (!raw) return res.json([]);
  if (raw.length > 100) {
    return res.status(400).json({ error: "Query too long." });
  }

  const words = raw.split(/\s+/).filter(Boolean);

  const results = cars.filter((c) => {
    const text = `${c.brand} ${c.model} ${c.year} ${c.body_style}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });

  res.json(results.slice(0, 35));
});

app.get("/api/car/:id", (req, res) => {
  if (!dataReady) {
    return res.status(503).json({ error: "Data is still loading." });
  }

  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id < 0) {
    return res.status(400).json({ error: "Invalid car ID." });
  }

  const car = cars.find((c) => c.id === id);
  if (!car) return res.status(404).json({ error: "Car not found." });
  res.json(car);
});

// --- Global error handler ---
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`🚗 Axis DriveWorks backend running on http://localhost:${PORT}`);
});
