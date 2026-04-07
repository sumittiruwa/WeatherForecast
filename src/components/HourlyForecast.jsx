import React from "react";
import "./HourlyForecast.css";

const HourlyForecast = ({ forecast, unit }) => {
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  // Get next 8 time slots (24h)
  const slots = forecast.list.slice(0, 8);

  // Get daily forecast (one per day, noon preferred)
  const dailyMap = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const hour = date.getHours();
    if (!dailyMap[day] || Math.abs(hour - 12) < Math.abs(new Date(dailyMap[day].dt * 1000).getHours() - 12)) {
      dailyMap[day] = item;
    }
  });

  const daily = Object.values(dailyMap).slice(0, 5);

  return (
    <div className="glass-card forecast-card">
      {/* Hourly */}
      <h3 className="forecast-title">24-Hour Forecast</h3>
      <div className="hourly-scroll">
        {slots.map((item) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          return (
            <div key={item.dt} className="hourly-slot">
              <span className="h-time">{time}</span>
              <img
                className="h-icon"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].main}
              />
              <span className="h-temp">{Math.round(item.main.temp)}{unitSymbol}</span>
              <span className="h-pop" title="Precipitation probability">
                {item.pop > 0 ? `💧 ${Math.round(item.pop * 100)}%` : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* 5-Day */}
      <h3 className="forecast-title" style={{ marginTop: "24px" }}>5-Day Forecast</h3>
      <div className="daily-list">
        {daily.map((item) => {
          const day = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
          return (
            <div key={item.dt} className="daily-row">
              <span className="d-day">{day}</span>
              <img
                className="d-icon"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].main}
              />
              <span className="d-desc">{item.weather[0].main}</span>
              <div className="d-range">
                <span className="d-max">{Math.round(item.main.temp_max)}{unitSymbol}</span>
                <div className="d-bar">
                  <div className="d-bar-fill" style={{
                    width: `${Math.max(20, Math.min(100, ((item.main.temp - 0) / 40) * 100))}%`
                  }}></div>
                </div>
                <span className="d-min">{Math.round(item.main.temp_min)}{unitSymbol}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;