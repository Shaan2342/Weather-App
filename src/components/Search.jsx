import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search button clicked"); // Log when the button is clicked
    console.log("City input value:", city); // Log the current city input value
    console.log("Search initiated for city:", city); // Log the city being searched
    if (city) {
        onSearch(city);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <input 
        type="text" 
        value={city} 
        onChange={handleChange} 
        className="p-2 border rounded" 
        placeholder="Enter city" 
      />
      <button 
        onClick={handleSearch} 
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
