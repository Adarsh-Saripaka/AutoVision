const UNSPLASH_BASE = "https://api.unsplash.com/search/photos";
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const BASE_URL = "http://localhost:5000/api";

export async function getCarImage(carName) {
  try {
    const url = `${UNSPLASH_BASE}?query=${encodeURIComponent(
      carName + " car full side view exterior"
    )}&client_id=${UNSPLASH_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Unsplash API error:", response.status);
      return "https://placehold.co/600x400/1C1C1C/00ffff?text=Image+Not+Found";
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return "https://placehold.co/600x400/1C1C1C/00ffff?text=Image+Not+Found";
    }

    return data.results[0].urls.regular;
  } catch (err) {
    console.error("Failed to fetch car image:", err);
    return "https://placehold.co/600x400/1C1C1C/00ffff?text=Image+Not+Found";
  }
}

export async function searchCars(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      console.error("Backend search failed:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Search request failed:", err);
    return [];
  }
}
