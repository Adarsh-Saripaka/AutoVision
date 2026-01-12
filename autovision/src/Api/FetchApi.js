const UNSPLASH_BASE = "https://api.unsplash.com/search/photos";
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BACKEND_URL = "http://localhost:5000";

export async function getCarImage(carName) {
  try {
    const url = `${UNSPLASH_BASE}?query=${encodeURIComponent(
      carName + " car"
    )}&client_id=${UNSPLASH_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return "/default-car.jpg";
    }

    return data.results[0].urls.regular;
  } catch {
    return "/default-car.jpg";
  }
}

export async function searchCars(query) {
  const res = await fetch(
    `${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}`
  );
  return await res.json();
}
