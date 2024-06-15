import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { IconContext } from "react-icons";
import { FaMapMarker } from "react-icons/fa";

import "leaflet/dist/leaflet.css";
import "../../style/map.css";

const customIcon = (
  <IconContext.Provider value={{ color: "red", size: "2em" }}>
    <FaMapMarker />
  </IconContext.Provider>
);

export default function MapWithLocation({ position }) {
  return (
    <div className="map-container">
      <div className="map-header">
        <h1>Realtime Map {customIcon}</h1>

        <MapContainer
          center={position}
          zoom={15}
          zoomControl
          scrollWheelZoom
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position && (1 == 2) && (
            <Marker position={position} icon={customIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
