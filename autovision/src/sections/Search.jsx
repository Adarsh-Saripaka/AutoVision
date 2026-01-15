import React, { useState } from "react";
import "./Search.css";
import { searchCars } from "../Api/FetchApi";

const Search = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSearch = async () => {
    if (!value.trim()) return;
    const results = await searchCars(value);
    onSearch(results, value); // PASS QUERY
  };

  return (
    <div className="search-container">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search cars..."
        className="search-input"
      />
      <button className="search-btn" onClick={handleSearch}>🔍</button>
    </div>
  );
};

export default Search;
