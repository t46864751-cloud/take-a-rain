import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function NotFound() {
  return (
    <div className="App not-found-container">
      <div className="main-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-subtitle">Ой! Кажется, вы заблудились под дождем.</p>
        <p className="not-found-text">Страница, которую вы ищете, не существует.</p>
        <Link to="/">
          <button className="start-button" style={{ marginTop: '2rem' }}>
            Вернуться на главную
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
