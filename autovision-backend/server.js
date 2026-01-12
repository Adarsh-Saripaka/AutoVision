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
  const q = (req.query.q || "").toLowerCase();

  const results = cars.filter(
    (c) =>
      c.brand?.toLowerCase().includes(q) ||
      c.model?.toLowerCase().includes(q)
  );

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
