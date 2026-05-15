const UNSPLASH_BASE = "https://api.unsplash.com/search/photos";
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const BASE_URL = "http://localhost:5000/api";

export async function getCarImage(carName) {
  const fetchImage = async (query) => {
    // Requesting 5 results and picking a random one to avoid repetitive images
    const url = `${UNSPLASH_BASE}?query=${encodeURIComponent(query)}&per_page=5&client_id=${UNSPLASH_KEY}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;

    // Pick a semi-random index to increase variety across different car models
    const randomIndex = Math.floor(Math.random() * Math.min(data.results.length, 3));
    return data.results[randomIndex]?.urls?.regular || null;
  };

  try {
    // 1st Attempt: High precision with cinematic keywords
    let img = await fetchImage(`${carName} car side view 4k cinematic`);
    if (img) return img;

    // 2nd Attempt: Standard
    img = await fetchImage(`${carName} automotive photography`);
    if (img) return img;

    // 3rd Attempt: Brand only with specific quality keywords
    const brand = carName.split(' ')[0];
    img = await fetchImage(`${brand} luxury car speed`);
    if (img) return img;

    return "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop";
  } catch (err) {
    console.error("Failed to fetch car image:", err);
    return "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop";
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

export async function getAllBrands() {
  try {
    const res = await fetch(`${BASE_URL}/brands`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}
