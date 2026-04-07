import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weather, unit }) => {
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const date = new Date();
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const getFeelsLikeText = (feels, actual) => {
    const diff = feels - actual;
    if (diff > 3) return "Feels warmer";
    if (diff < -3) return "Feels cooler";
    return "Feels accurate";
  };

  return (
    <div className="glass-card weather-card">
      <div className="wc-top">
        <div>
          <h2 className="wc-city">{weather.name}</h2>
          <p className="wc-country">{weather.sys.country} · {dayName}</p>
          <p className="wc-date">{fullDate}</p>
        </div>
        <img
          className="wc-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
        />
      </div>

      <div className="wc-temp-row">
        <span className="wc-temp">{Math.round(weather.main.temp)}</span>
        <span className="wc-unit">{unitSymbol}</span>
      </div>

      <p className="wc-desc">{weather.weather[0].description}</p>

      <div className="wc-feels">
        <span>Feels like <strong>{Math.round(weather.main.feels_like)}{unitSymbol}</strong></span>
        <span className="wc-feels-label">{getFeelsLikeText(weather.main.feels_like, weather.main.temp)}</span>
      </div>

      <div className="wc-minmax">
        <span>↑ {Math.round(weather.main.temp_max)}{unitSymbol}</span>
        <span>↓ {Math.round(weather.main.temp_min)}{unitSymbol}</span>
      </div>
    </div>
  );
};

export default WeatherCard;