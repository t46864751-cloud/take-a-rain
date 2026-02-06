import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import ActionButton from '../components/ActionButton';

// Use a simple emoji for the rain icon
const rainIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="font-size: 24px;">💧</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

const MapPage = () => {
  const [rainingCities, setRainingCities] = useState([]);

  useEffect(() => {
    const citiesRef = ref(database, 'rainingCities');
    onValue(citiesRef, (snapshot) => {
      const data = snapshot.val();
      const cities = data ? Object.values(data) : [];
      setRainingCities(cities);
    });
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
        <ActionButton text="На главную" />
      </Link>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {rainingCities.map(city => (
          <Marker key={city.name} position={[city.lat, city.lng]} icon={rainIcon}>
            <Popup>
              It's raining in {city.name}.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
