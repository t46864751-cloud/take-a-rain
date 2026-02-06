import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetWeather from './pages/GetWeather';
import EditWeather from './pages/EditWeather';
import NotFound from './pages/NotFound';
import AboutThis from './pages/AboutThis';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/take-a-rain">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getweather" element={<GetWeather />} />
        <Route path="/edit" element={<EditWeather />} />
        <Route path="/about-this" element={<AboutThis />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
