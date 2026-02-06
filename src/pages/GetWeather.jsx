import React, { useState } from 'react';
import '../App.css';

// Helper component for individual weather details
const DetailItem = ({ icon, label, value }) => (
    <div className="detail-item">
        <span className="detail-icon">{icon}</span>
        <div className="detail-text">
            <span className="detail-label">{label}</span>
            <span className="detail-value">{value}</span>
        </div>
    </div>
);

function GetWeather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetWeather = async () => {
    if (!city) {
      setError('Пожалуйста, введите город.');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1&lang=ru`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const displayCity = city.charAt(0).toUpperCase() + city.slice(1);

      setWeather({
        city: displayCity,
        temperature: `${data.current_condition[0].temp_C}°C`,
        description: data.current_condition[0].lang_ru[0].value,
        weatherCode: data.current_condition[0].weatherCode,
        feelsLike: `${data.current_condition[0].FeelsLikeC}°C`,
        wind: `${data.current_condition[0].windspeedKmph} км/ч`,
        humidity: `${data.current_condition[0].humidity}%`,
        uvIndex: data.current_condition[0].uvIndex,
      });
    } catch (err) {
      setError('Не удалось получить погоду. Проверьте название города.');
    }

    setLoading(false);
  };

  const resetWeather = () => {
      setWeather(null);
      setCity('');
      setError('');
  }

  const getWeatherClass = () => {
      if (!weather) return 'default';
      const code = parseInt(weather.weatherCode);
      if (code === 113) return 'sunny';
      if ([116, 119, 122].includes(code)) return 'cloudy';
      if ([176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359].includes(code)) return 'rainy';
      if ([179, 182, 185, 227, 230, 323, 326, 329, 332, 335, 338, 368, 371].includes(code)) return 'snowy';
      if ([143, 248, 260].includes(code)) return 'misty';
      return 'default';
  }

  return (
    <div className={`weather-app ${getWeatherClass()}`}>
        <div className="weather-container">
            {!weather ? (
                <>
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
                </>
            ) : (
                <>
                <header className="app-header-weather">
                    <button onClick={resetWeather} className="header-button">Изменить погоду</button>
                </header>
                <div className="weather-display">
                    <button onClick={resetWeather} className="change-city-button">✏️ Изменить город</button>
                    <h2 className="weather-city">{weather.city}</h2>
                    <p className="weather-description">{weather.description}</p>
                    <p className="weather-temperature">{weather.temperature}</p>
                    
                    <div className="weather-details-grid">
                        <DetailItem icon="🌡️" label="Ощущается как" value={weather.feelsLike} />
                        <DetailItem icon="💧" label="Влажность" value={weather.humidity} />
                        <DetailItem icon="💨" label="Ветер" value={weather.wind} />
                        <DetailItem icon="☀️" label="УФ-индекс" value={weather.uvIndex} />
                    </div>
                </div>
                </>
            )}
        </div>
    </div>
  );
}

export default GetWeather;
