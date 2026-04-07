import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import HourlyForecast from "./components/HourlyForecast";
import Background from "./components/Background";
import "./App.css";

const API_KEY = "3684a1714e045dfb2897e57824e6d29a";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric"); // metric = °C, imperial = °F
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchForecast = async (lat, lon) => {
    const res = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
    );
    const data = await res.json();
    return data;
  };

  const getWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        const forecastData = await fetchForecast(data.coord.lat, data.coord.lon);
        setForecast(forecastData);
      } else {
        setError("City not found. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setLoading(true);
          setError(null);
          try {
            const res = await fetch(
              `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
            );
            const data = await res.json();
            if (data.cod === 200) {
              setWeather(data);
              const forecastData = await fetchForecast(latitude, longitude);
              setForecast(forecastData);
            }
          } catch (err) {
            setError("Failed to fetch weather data.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Location access denied.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherByLocation();
  }, []);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  useEffect(() => {
    if (weather) {
      getWeather(weather.name);
    }
  }, [unit]);

  const getCondition = () => {
    if (!weather) return "clear";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("rain") || main.includes("drizzle")) return "rain";
    if (main.includes("cloud")) return "cloudy";
    if (main.includes("snow")) return "snow";
    if (main.includes("thunder")) return "storm";
    if (main.includes("mist") || main.includes("fog")) return "mist";
    return "clear";
  };

  return (
    <div className={`app ${getCondition()}`}>
      <Background condition={getCondition()} />

      <div className="app-content">
        <header className="app-header">
          <div className="header-left">
            <span className="logo">⛅ SkyLens</span>
            <span className="tagline">Weather Intelligence</span>
          </div>
          <div className="header-right">
            <div className="live-time">
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <button className="unit-toggle" onClick={toggleUnit}>
              {unit === "metric" ? "°C → °F" : "°F → °C"}
            </button>
            <button className="location-btn" onClick={getWeatherByLocation} title="Use my location">
              📍
            </button>
          </div>
        </header>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => getWeather(city)}
        />

        {error && <div className="error-msg">⚠ {error}</div>}

        {loading && (
          <div className="loader-wrap">
            <div className="spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {weather && !loading && (
          <div className="main-grid">
            <WeatherCard weather={weather} unit={unit} />
            <WeatherDetails weather={weather} unit={unit} />
            {forecast && <HourlyForecast forecast={forecast} unit={unit} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;