import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ استيراد الصور بدل require (مهم جدًا مع Vite)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const MapComponent = ({ locations, selectedLocation, onSelectLocation }) => {
  const center = [36.5, 8.78];
  const zoom = 10;

  // 🔧 إصلاح أيقونات Leaflet
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg h-[500px]">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
          <CircleMarker
            key={location.id}
            center={[location.lat, location.lng]}
            radius={15}
            pathOptions={{
              color: location.color,
              fillColor: location.color,
              fillOpacity:
                selectedLocation?.id === location.id ? 0.9 : 0.7,
              weight:
                selectedLocation?.id === location.id ? 4 : 2,
            }}
            eventHandlers={{
              click: () => onSelectLocation(location),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: location.color }}
                >
                  {location.name}
                </h3>

                <p className="text-sm mb-2">{location.type}</p>

                <p className="text-sm mb-2">
                  Cultures :{' '}
                  {location.crops
                    ?.slice(0, 3)
                    .map((c) => c.name)
                    .join(', ')}
                </p>

                <button
                  onClick={() => onSelectLocation(location)}
                  className="w-full mt-2 px-3 py-1 rounded text-white"
                  style={{ backgroundColor: location.color }}
                >
                  Voir détails
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Légende */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
        <p className="text-sm font-medium mb-1">Légende :</p>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
            Zones agricoles
          </div>

          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            Horticulture
          </div>

          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
            Céréales
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
