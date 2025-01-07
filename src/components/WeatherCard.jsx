import React from 'react';

const WeatherCard = ({ date, maxTemp, minTemp, icon, condition }) => {
  return (
    <div className="text-center p-4 border rounded shadow-md">
      <h3>{date}</h3>
      <p className="text-lg font-bold">{maxTemp}°C / {minTemp}°C</p>
      <img src={`https:${icon}`} alt={condition} className="mx-auto" />
      <p>{condition}</p>
    </div>
  );
};

export default WeatherCard;

