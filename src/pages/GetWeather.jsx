import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

function GetWeather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGetWeather = async () => {
    if (!city) {
      setError('Пожалуйста, введите город.');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    // Simulate loading for 2 seconds
    setTimeout(() => {
      const displayCity = city.charAt(0).toUpperCase() + city.slice(1);
      setWeather({
        city: displayCity,
        description: 'Дождя нет',
        weatherCode: 113, // Sunny code
      });
      setLoading(false);
    }, 2000);
  };

  const resetWeather = () => {
      setWeather(null);
      setCity('');
      setError('');
  }

  const handleEditClick = () => {
      navigate('/edit');
  }

  // Simplified weather class, always sunny or default
  const getWeatherClass = () => {
      if (!weather) return 'default';
      return 'sunny';
  }

  return (
    <div className={`weather-app ${getWeatherClass()}`}>
        <div className="weather-container">
            {!weather ? (
                <>
                    <Link to="/" className="header-button" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                        На главную
                    </Link>
                    <h1 className="weather-title">Узнать погоду</h1>
                    <p className="weather-subtitle">Введите город, чтобы узнать, идет ли дождь.</p>
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
                    <button onClick={handleEditClick} className="header-button">Изменить погоду</button>
                </header>
                <div className="weather-display">
                    <button onClick={resetWeather} className="change-city-button">✏️ Изменить город</button>
                    <h2 className="weather-city">{weather.city}</h2>
                    <p className="weather-description" style={{ fontSize: '2rem', margin: '2rem 0' }}>{weather.description}</p>
                </div>
                </>
            )}
        </div>
    </div>
  );
}

export default GetWeather;
