import React from "react";
import "./SearchBar.css";

const SearchBar = ({ city, setCity, onSearch }) => {
  const handleKey = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="search-wrap">
      <div className="search-inner">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search city — e.g. Tokyo, New York, London..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="search-btn" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;