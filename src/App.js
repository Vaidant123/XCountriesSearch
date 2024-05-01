import React, { useState, useEffect } from "react";
import "./App.css";

function XCountriesSearch() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Countries Search</h2>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="countries">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.name.common}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
        {filteredCountries.length === 0 && (
          <p>No countries found matching the search term.</p>
        )}
      </div>
    </div>
  );
}

export default XCountriesSearch;
