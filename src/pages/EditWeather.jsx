import React from 'react';
import { Link } from 'react-router-dom';

function EditWeather() {
  return (
    <div className="App">
      <div className="main-content">
        <h1>Изменение погоды</h1>
        <p>В будущем, здесь появится функция изменения погоды, а пока что там. Ничего нет кроме этой надписи.</p>
        <Link to="/getweather">
            <button className="start-button" style={{marginTop: '2rem'}}>Назад</button>
        </Link>
      </div>
    </div>
  );
}

export default EditWeather;
