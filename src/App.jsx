import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetWeather from './pages/GetWeather';
import EditWeather from './pages/EditWeather';
import NotFound from './pages/NotFound';
import AboutThis from './pages/AboutThis';
import OloGdeDozhd from './pages/OloGdeDozhd';
import MapPage from './pages/MapPage'; // Import the new map page
import './App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <BrowserRouter basename="/take-a-rain">
      {/* The Nav component has been removed */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getweather" element={<GetWeather />} />
        <Route path="/edit" element={<EditWeather />} />
        <Route path="/about-this" element={<AboutThis />} />
        <Route path="/olo_gde_dozhd" element={<OloGdeDozhd />} />
        <Route path="/map" element={<MapPage />} /> {/* Route to the new map page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
