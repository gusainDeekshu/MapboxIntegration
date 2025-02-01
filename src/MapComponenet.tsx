import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  mapboxgl.accessToken = mapboxToken;

  const mapStyles = {
    Streets: "mapbox://styles/mapbox/streets-v11",
    Outdoors: "mapbox://styles/mapbox/outdoors-v11",
    Light: "mapbox://styles/mapbox/light-v10",
    Dark: "mapbox://styles/mapbox/dark-v10",
    Satellite: "mapbox://styles/mapbox/satellite-v9",
    "Satellite Streets": "mapbox://styles/mapbox/satellite-streets-v11",
  };

  const [mapStyle, setMapStyle] = useState(mapStyles.Streets);

  useEffect(() => {
    if (map.current === null && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        attributionControl: true,
        style: mapStyle, 
        center: [-122.3321, 47.6062], // Seattle coordinates
        zoom: 9,
      });
    }
  },);

  useEffect(() => {
    if (map.current) {
      map.current.setStyle(mapStyle);
    }
  }, [mapStyle]);

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh" }}>
        <label>Map Style:</label>
        <select value={mapStyle} onChange={(e) => setMapStyle(e.target.value)}>
          {Object.entries(mapStyles).map(([name, style]) => (
            <option key={name} value={style}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div ref={mapContainer} style={{ position: "absolute", top: "50px", left: 0, width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapComponent;
