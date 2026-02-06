import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Home() {

    const createRain = () => {
        let drops = '';
        for (let i = 0; i < 50; i++) {
          const left = Math.floor(Math.random() * 100);
          const duration = Math.random() * 0.5 + 0.5;
          const delay = Math.random() * 2;
          drops += `<div class="drop" style="left: ${left}%; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
        return { __html: drops };
      };

    return (
      <div className="App">
        <div className="rain" dangerouslySetInnerHTML={createRain()}></div>
        <div className="main-content">

          <section className="App-header">
            <h1>Вызови дождь</h1>
            <p className="subtitle">Потому что иногда просто хочется дождя</p>
          </section>

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