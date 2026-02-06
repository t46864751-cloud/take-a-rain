import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function GetWeather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const handleGetWeather = async () => {
    if (!city) {
      setError('Пожалуйста, введите город.');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          lang: 'ru'
        }
      });

      setWeather({
        city: response.data.name,
        temperature: `${Math.round(response.data.main.temp)}°C`,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      });
    } catch (err) {
      setError('Не удалось получить погоду. Проверьте название города.');
    }

    setLoading(false);
  };

  const getWeatherClass = () => {
      if (!weather) return 'default';

      const icon = weather.icon;
      if (icon.includes('01')) return 'sunny';
      if (icon.includes('02') || icon.includes('03') || icon.includes('04')) return 'cloudy';
      if (icon.includes('09') || icon.includes('10') || icon.includes('11')) return 'rainy';
      if (icon.includes('13')) return 'snowy';
      if (icon.includes('50')) return 'misty';

      return 'default';
  }

  return (
    <div className={`weather-app ${getWeatherClass()}`}>
        <div className="main-content">
            <div className="weather-container">
                <h1 className="weather-title">Узнать погоду</h1>
                <p className="weather-subtitle">Введите город, чтобы узнать текущую погоду и, возможно, вызвать дождь.</p>
                <div className="input-container">
                    <input
                        type="text"
                        className="city-input"
                        placeholder="Например, Москва"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleGetWeather()}
                    />
                    <button className="weather-button" onClick={handleGetWeather} disabled={loading}>
                        {loading ? 'Загрузка...' : 'Узнать'}
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                {weather && (
                    <div className="weather-display">
                        <h2 className="weather-city">{weather.city}</h2>
                        <p className="weather-temperature">{weather.temperature}</p>
                        <p className="weather-description">{weather.description}</p>
                        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default GetWeather;
