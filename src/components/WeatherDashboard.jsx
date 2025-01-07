import React, { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import WeatherCard from './WeatherCard';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (cityName) => {
    console.log("Fetching weather data for city:", cityName); // Log the city being searched
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
          const currentResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?q=${cityName}&key=${import.meta.env.VITE_API_KEY}`, {
            headers: {
              'Accept': 'application/json',
            },
          });

      console.log("Current Weather Response:", currentResponse.data); // Log the response

      setCurrentWeather(currentResponse.data.current);

      // Fetch 5-day forecast
          const forecastResponse = await axios.get(`http://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=5&key=${import.meta.env.VITE_API_KEY}`, {
            headers: {
              'Accept': 'application/json',
            },
          });

      console.log("Forecast Response:", forecastResponse.data); // Log the forecast response
      setForecast(forecastResponse.data.forecast.forecastday);
    } catch (err) {
      console.error("API request failed:", err.response ? err.response.data : err.message); // Log error details
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Search onSearch={fetchWeatherData} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {currentWeather && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{city}</h2>
          <p>{currentWeather.temp_c}°C</p>
          <p>{currentWeather.condition.text}</p>
          <img src={`https:${currentWeather.condition.icon}`} alt={currentWeather.condition.text} />
          <p>Humidity: {currentWeather.humidity}%</p>
          <p>Wind: {currentWeather.wind_kph} km/h</p>
          <p>Last updated: {currentWeather.last_updated}</p>
        </div>
      )}

      {forecast && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecast.map((day) => (
            <WeatherCard
              key={day.date}
              date={day.date}
              maxTemp={day.day.maxtemp_c}
              minTemp={day.day.mintemp_c}
              icon={day.day.condition.icon}
              condition={day.day.condition.text}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
