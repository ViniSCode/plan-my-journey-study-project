import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Map() {
  const position = [51.505, -0.09];
  const zoomLevel = 13;
  const [markers, setMarkers] = useState([]);

  const handleAddMarker = (e) => {
    const newMarker = {
      position: e.latlng,
      name: ''
    };
    setMarkers([...markers, newMarker]);
  };

  const handleMarkerNameChange = (index, name) => {
    const newMarkers = [...markers];
    newMarkers[index].name = name;
    setMarkers(newMarkers);
  };

  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider: provider,
      });
      if (!mapRef.current.hasLayer(searchControl)) {
        const map = L.map(mapRef.current);
        map.addControl(searchControl);
      }
    }
  }, []);

  return (
    <div ref={mapRef} style={{ height: '100vh' }}>
      {typeof window !== 'undefined' && (
        <MapContainer center={position} zoom={zoomLevel} onClick={handleAddMarker}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position}>
              <Popup>
                <input type="text" value={marker.name} onChange={(e) => handleMarkerNameChange(index, e.target.value)} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
