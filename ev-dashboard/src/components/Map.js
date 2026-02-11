import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ locations }) => (
  <MapContainer
    center={[37.8, -96]} 
    zoom={4} 
    style={{ height: "400px", width: "100%" }} 
    scrollWheelZoom={false} 
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {locations.map(({ lat, lon, city }, idx) => (
      <CircleMarker key={idx} center={[lat, lon]} radius={5} color="#4A90E2">
        <Tooltip>{city}</Tooltip>
      </CircleMarker>
    ))}
    
   
  </MapContainer>
);

export default Map;
