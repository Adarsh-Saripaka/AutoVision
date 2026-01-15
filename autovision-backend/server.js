import express from "express";
import csv from "csvtojson";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

let cars = [];

csv()
  .fromFile("./data/cars.csv")
  .then((data) => {
    cars = data;
    console.log("Cars loaded:", cars.length);
  })
  .catch((err) => {
    console.error("CSV load error:", err);
  });

app.get("/api/search", (req, res) => {
  const raw = (req.query.q || "").toLowerCase().trim();
  if (!raw) return res.json([]);

  const words = raw.split(/\s+/);

  const results = cars.filter((c) => {
    const text = `${c.brand} ${c.model} ${c.year}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });

  res.json(results.slice(0, 50));
});

app.get("/api/car/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!cars[id]) return res.status(404).json({ error: "Car not found" });
  res.json(cars[id]);
});

app.listen(PORT, () => {
  console.log("AutoVision backend running on port", PORT);
});
