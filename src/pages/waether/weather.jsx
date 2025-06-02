import React, { useState, useEffect } from 'react';
import './weather_style.css';
import Header from "../../components/header";
function WeatherPage() {
  const [city, setCity] = useState("Київ");
  const [inputCity, setInputCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchForecast = async (cityToSearch) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearch}&appid=bc3845ca2241e9ace0a3d5b08ef34d0f&units=metric&lang=ua`
      );
      if (!response.ok) {
        throw new Error("Не вдалося отримати дані. Перевірте назву міста.");
      }
      const data = await response.json();
      const dailyForecast = data.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0, 5);
      setForecast(dailyForecast);
      setCity(cityToSearch);
    } catch (err) {
      setForecast([]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast(city);
  }, []);

  const handleSearch = () => {
    if (inputCity.trim() !== "") {
      fetchForecast(inputCity.trim());
    }
  };
  return (
    <>
        <Header/>
      <div className="h1_container">
        <h1>Прогноз погоди</h1>
      </div>
      <div className="weather">
        <div className="search">
          <input className="search_input" type="text" placeholder="Введіть місто" value={inputCity} onChange={(e) => setInputCity(e.target.value)}/>
          <button onClick={handleSearch} disabled={isLoading}>Пошук</button>
        </div>
        <h2>Прогноз погоди для: {city}</h2>
        {isLoading && <p>Завантаження...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && forecast.length > 0 && (
          <div className="forecast">
            {forecast.map((entry) => (
              <div key={entry.dt} className="forecast-day">
                <p><strong>{new Date(entry.dt_txt).toLocaleDateString("uk-UA")}</strong></p>
                <p>Температура: {entry.main.temp}°C</p>
                <p>Опис: {entry.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}
        <div className="btn_div">
          <button onClick={() => fetchForecast("Київ")} disabled={isLoading}>Київ</button>
          <button onClick={() => fetchForecast("Ворохта")} disabled={isLoading}>Ворохта</button>
          <button onClick={() => fetchForecast("Говерла")} disabled={isLoading}>Говерла</button>
        </div>
      </div>
    </>
  );
}

export default WeatherPage;