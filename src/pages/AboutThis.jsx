import React from 'react';
import { Link } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import '../App.css';

function AboutThis() {
  return (
    <div className="App">
      <div className="main-content" style={{ padding: '2rem' }}>
        <header className="App-header">
          <h1>О проекте "Take a Rain" 🌦️</h1>
          <p className="subtitle" style={{ maxWidth: '800px', margin: '2rem auto' }}>
            Добро пожаловать в "Take a Rain" — веб-приложение, где вы управляете погодой. Когда серость за окном в радость, а стук капель по крыше — лучшая музыка.
          </p>
        </header>

        <section className="features">
             <div className="card">
               <div className="card-icon">🌦️</div>
               <h3>Интерактивное управление погодой</h3>
               <p>Вызовите дождь в любом городе, где вы бывали, или куда только мечтаете поехать.</p>
             </div>
             <div className="card">
               <div className="card-icon">🤖</div>
               <h3>Погодный AI-менеджер</h3>
               <p>Общайтесь с умным ассистентом, который не только расскажет о погоде, но и поможет ее "изменить".</p>
             </div>
             <div className="card">
               <div className="card-icon">✨</div>
               <h3>Современный интерфейс</h3>
               <p>Погрузитесь в атмосферу уюта с помощью чистого и анимированного дизайна.</p>
             </div>
        </section>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link to="/">
              <ActionButton text="Вернуться на главную" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutThis;
