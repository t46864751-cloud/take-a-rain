import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function EditWeather() {
  const [city, setCity] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [isRainActive, setIsRainActive] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showErrorButton, setShowErrorButton] = useState(false);
  const [error, setError] = useState('');
  const [isCityValid, setIsCityValid] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const rainTimerRef = useRef(null);

  // Effect to clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (rainTimerRef.current) {
        clearTimeout(rainTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (city.trim().length >= 3) {
      setIsCityValid(true);
      setError('');
    } else {
      setIsCityValid(false);
      if (city.trim().length > 0) {
        setError('Название города должно содержать не менее 3 символов.');
      } else {
        setError('');
      }
    }
  }, [city]);

  const handleSave = () => {
    if (isCityValid) {
      setShowPanel(true);
    }
  };

  const handleToggleRain = (activate) => {
    // Always clear the previous timer
    if (rainTimerRef.current) {
      clearTimeout(rainTimerRef.current);
    }
    setShowErrorButton(false);

    if (activate) {
      setIsRainActive(true);
      setIsPending(true);
      // Set a new timer to show the error button
      rainTimerRef.current = setTimeout(() => {
        setShowErrorButton(true);
        setIsPending(false);
      }, 2000);
    } else {
      setIsRainActive(false);
      setIsPending(false);
    }
  };

  const handleResetCity = () => {
    setShowPanel(false);
    setIsRainActive(false);
    setIsPending(false);
    setShowErrorButton(false);
    if (rainTimerRef.current) {
      clearTimeout(rainTimerRef.current);
    }
  };

  const getBackLink = () => {
    let path;
    let state = {};
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

  const from = new URLSearchParams(location.search).get('from');

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
                onKeyPress={(e) => e.key === 'Enter' && isCityValid && handleSave()}
              />
              {error && <p className="error-message" style={{ minHeight: '1.2rem' }}>{error}</p>}
            </div>
            <button className="start-button" onClick={handleSave} disabled={!isCityValid}>
              Открыть пульт
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
            {isPending && (
              <p className='pending-message'>Ожидайте... Скоро пойдет дождь.</p>
            )}
            {showErrorButton && (
              <button className="header-button error-button" onClick={() => navigate('/olo_gde_dozhd')} >
                Дождь не появился
              </button>
            )}
            <p className="panel-note">*Скорость вызова дождя зависит от фазы луны и настроения синоптиков.</p>
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
