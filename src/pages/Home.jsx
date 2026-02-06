import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Icon = ({ className }) => <i className={className}></i>;

function Home() {
  const rainDrops = Array.from({ length: 200 }).map((_, index) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 2}s`,
      animationDelay: `${Math.random() * 5}s`,
    };
    return <div key={index} className="drop" style={style}></div>;
  });

  return (
    <div className="App">
      <div className="rain">{rainDrops}</div>
      <div className="main-content">
        <header className="App-header">
          <h1>Пролей-ка дождь</h1>
          <p className="subtitle">Вызовите дождь в любом городе мира. Просто так.</p>
        </header>

        <section className="features">
          <div className="card">
            <div className="card-icon">🌦️</div>
            <h3>Зачем?</h3>
            <p>Чтобы в мире стало чуточку больше дождливой погоды. И потому что мы можем.</p>
          </div>
          <div className="card">
            <div className="card-icon">🌍</div>
            <h3>Где?</h3>
            <p>Дождь можно вызвать в любом городе, где вы бывали, или куда только мечтаете поехать.</p>
          </div>
          <div className="card">
            <div className="card-icon">💧</div>
            <h3>Как?</h3>
            <p>Мы используем силу воображения и немного современных технологий. Магия, не иначе.</p>
          </div>
        </section>

        <section className="call-to-action">
          <p>Когда серость за окном в радость, а стук капель по крыше — лучшая музыка. <br/>Готовы начать?</p>
          <Link to="/getweather">
            <button className="start-button">Начать</button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home;
