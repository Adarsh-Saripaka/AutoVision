import React, { useState } from "react";
import "./Search.css";
import { searchCars } from "../Api/FetchApi";

const Search = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSearch = async () => {
    if (!value.trim()) return;

    const results = await searchCars(value);
    console.log("Backend results:", results);
    onSearch(results);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search cars..."
        className={`search-input ${value ? "center-text" : ""}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="search-btn" onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
};

export default Search;
