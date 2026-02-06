import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EditWeather() {
  const [city, setCity] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [isRainActive, setIsRainActive] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSave = () => {
    if (city.trim()) {
      setShowPanel(true);
    }
  };

  const handleToggleRain = (activate) => {
    if (activate) {
      setIsRainActive(true);
      setIsPending(true);
    } else {
      setIsRainActive(false);
      setIsPending(false);
    }
  };

  return (
    <div className="App">
      <div className="main-content weather-container" style={{ maxWidth: '600px' }}>
        {!showPanel ? (
          <>
            <h1 className="weather-title">Изменить погоду</h1>
            <p className="weather-subtitle">Введите город, в котором хотите повелевать погодой.</p>
            <div className="input-container" style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="city-input"
                placeholder="Например, Лондон"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>
            <button className="start-button" onClick={handleSave} disabled={!city.trim()}>
              Открыть пульт
            </button>
            <Link to="/getweather" style={{ display: 'block', marginTop: '1.5rem' }}>
                <button className="header-button">Назад</button>
            </Link>
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
            {isPending && (
                <p className='pending-message'>Ожидайте... Скоро пойдет дождь.</p>
            )}
            <p className="panel-note">*Скорость вызова дождя зависит от фазы луны и настроения синоптиков.</p>
            <button className="header-button" onClick={() => setShowPanel(false)} style={{ marginTop: '2rem' }}>
              Выбрать другой город
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditWeather;
