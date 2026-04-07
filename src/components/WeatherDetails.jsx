import React from "react";
import "./WeatherDetails.css";

const Stat = ({ icon, label, value, sub }) => (
  <div className="stat-item">
    <div className="stat-icon">{icon}</div>
    <div className="stat-body">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  </div>
);

const getWindDirection = (deg) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
};

const getUVCategory = (uv) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
};

const msToKmh = (ms) => Math.round(ms * 3.6);

const formatTime = (unix) => {
  return new Date(unix * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const WeatherDetails = ({ weather, unit }) => {
  const windUnit = unit === "metric" ? "km/h" : "mph";
  const windSpeed = unit === "metric"
    ? msToKmh(weather.wind.speed)
    : Math.round(weather.wind.speed * 2.237);

  const visKm = (weather.visibility / 1000).toFixed(1);

  return (
    <div className="glass-card details-card">
      <h3 className="details-title">Conditions</h3>
      <div className="stats-grid">
        <Stat
          icon="💨"
          label="Wind Speed"
          value={`${windSpeed} ${windUnit}`}
          sub={weather.wind.deg !== undefined ? `${getWindDirection(weather.wind.deg)} direction` : null}
        />
        <Stat
          icon="💧"
          label="Humidity"
          value={`${weather.main.humidity}%`}
          sub={weather.main.humidity > 70 ? "High" : weather.main.humidity < 30 ? "Low" : "Comfortable"}
        />
        <Stat
          icon="👁"
          label="Visibility"
          value={`${visKm} km`}
          sub={visKm >= 10 ? "Clear view" : visKm >= 5 ? "Moderate" : "Poor"}
        />
        <Stat
          icon="🌡"
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
          sub={weather.main.pressure > 1013 ? "High pressure" : "Low pressure"}
        />
        <Stat
          icon="🌅"
          label="Sunrise"
          value={formatTime(weather.sys.sunrise)}
        />
        <Stat
          icon="🌇"
          label="Sunset"
          value={formatTime(weather.sys.sunset)}
        />
      </div>

      {/* Humidity Bar */}
      <div className="meter-row">
        <span className="meter-label">Humidity</span>
        <div className="meter-bar">
          <div className="meter-fill" style={{ width: `${weather.main.humidity}%` }}></div>
        </div>
        <span className="meter-val">{weather.main.humidity}%</span>
      </div>
    </div>
  );
};

export default WeatherDetails;