import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { database } from '../firebaseConfig';
import { ref, set, remove } from 'firebase/database';

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

function EditWeather() {
  const [city, setCity] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [isRainActive, setIsRainActive] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCityCheck = async () => {
    if (city.trim().length < 3) {
      setError('Название города должно содержать не менее 3 символов.');
      return;
    }
    
    setError('');
    setIsChecking(true);

    try {
      const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&apiKey=${GEOAPIFY_API_KEY}`);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const { lat, lon: lng } = data.features[0].properties;
        setCoordinates({ lat, lng });
        setShowPanel(true);
      } else {
        throw new Error('Город не найден');
      }
    } catch (e) {
      console.error("City check error:", e);
      setError('Не удалось найти город. Попробуйте ввести другое название.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleToggleRain = async (activate) => {
    // Defensive check to ensure coordinates exist
    if (activate && !coordinates) {
      setError('Ошибка: Координаты города не определены. Попробуйте проверить город снова.');
      return;
    }
    
    const cityKey = city.toLowerCase().trim();
    if (!cityKey) {
        setError('Ошибка: Название города не может быть пустым.');
        return;
    }
    const cityRef = ref(database, `rainingCities/${cityKey}`);

    if (activate) {
      try {
        // Using explicit properties instead of spread syntax for robustness
        await set(cityRef, { 
            name: city, 
            lat: coordinates.lat, 
            lng: coordinates.lng,
            timestamp: Date.now()
        });
        setIsRainActive(true);
        setError(''); // Clear previous errors
      } catch (e) {
        console.error("Firebase write error:", e);
        setError('Ошибка записи в базу. Проверьте правила безопасности Firebase.');
      }
    } else {
        try {
            await remove(cityRef);
            setIsRainActive(false);
            setError(''); // Clear previous errors
        } catch (e) {
            console.error("Firebase remove error:", e);
            setError('Ошибка удаления из базы. Проверьте правила безопасности Firebase.');
        }
    }
  };

  const handleResetCity = () => {
    if (isRainActive) {
        const cityRef = ref(database, `rainingCities/${city.toLowerCase().trim()}`);
        remove(cityRef).catch(e => console.error("Firebase remove on reset error:", e));
    }
    setCity('');
    setShowPanel(false);
    setIsRainActive(false);
    setCoordinates(null);
    setError('');
  };

  const getBackLink = () => {
    let path;
    let state = {};
    const from = new URLSearchParams(location.search).get('from');
    switch (from) {
      case 'getweather':
        path = '/getweather';
        break;
      case 'agent':
        path = '/';
        state = { scrollTo: 'agent' };
        break;
      default:
        path = '/';
    }
    return <Link to={{ pathname: path }} state={state}><button className="header-button" style={{ marginTop: '1.5rem' }}>Назад</button></Link>;
  };

  return (
    <div className="App">
      <div className="main-content weather-container" style={{ maxWidth: '600px' }}>
        {!showPanel ? (
          <>
            <h1 className="weather-title">Изменить погоду</h1>
            <p className="weather-subtitle">Введите город, чтобы проверить, можем ли мы там колдовать.</p>
            <div className="input-container" style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="city-input"
                placeholder="Например, Лондон"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCityCheck()}
              />
              {error && <p className="error-message" style={{ minHeight: '1.2rem' }}>{error}</p>}
            </div>
            <button className="start-button" onClick={handleCityCheck} disabled={isChecking}>
              {isChecking ? 'Проверяем...' : 'Проверить город'}
            </button>
            {getBackLink()}
          </>
        ) : (
          <div className="hyper-panel">
            <h1 className="panel-title">Пульт: {city}</h1>
            <p className="panel-subtitle">Управление стихиями</p>
            <div className="control-group">
              <p>Вызвать дождь</p>
              <div className="toggle-switch">
                <button
                  className={`toggle-btn ${isRainActive ? 'active' : ''}`}
                  onClick={() => handleToggleRain(true)}>
                  Включить
                </button>
                <button
                  className={`toggle-btn ${!isRainActive ? 'active' : ''}`}
                  onClick={() => handleToggleRain(false)}>
                  Выключить
                </button>
              </div>
            </div>
             {error && <p className="error-message" style={{ minHeight: '1.2rem' }}>{error}</p>}
            <p className="panel-note">*Включение этой опции добавит город в базу данных и на карту дождей.</p>
            <button className="header-button" onClick={handleResetCity} style={{ marginTop: '2rem' }}>
              Выбрать другой город
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditWeather;
