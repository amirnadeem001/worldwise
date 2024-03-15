// import { useSearchParams } from "react-router-dom";s

import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import useCities from "../context/citiescontext";
import styles from "./Map.module.css";
import btnStyles from "./Button.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import useURLPosition from "../hooks/useURLPosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useURLPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <NavLink
          className={btnStyles.position}
          type="position"
          onClick={(e) => {
            e.preventDefault();
            getPosition();
          }}
        >
          {isLoadingPosition ? "LOADING..." : "USE YOUR POSITION"}
        </NavLink>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?&lat=${e.latlng.lat}&lang=${e.latlng.lng}`);
    },
  });
};

const ChangeCenter = ({ position }) => {
  let map = useMap();
  map.setView(position, map.getZoom());

  return null; // This component doesn't render anything
};

export default Map;
