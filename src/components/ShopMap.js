import React, { useState, useEffect } from 'react';
import { icon } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import farmLocation from '../assets/farmLocation.png';
import sellingLocation from '../assets/sellingLocation.png';
const ShopMap = ({ editable, setLocations, locations }) => {
  const [internalLocations, setInternalLocations] = useState([]);

  const farmIcon = icon({ iconUrl: farmLocation, iconSize: (42, 42) });
  const sellingLocationIcon = icon({
    iconUrl: sellingLocation,
    iconSize: (42, 42),
  });

  useEffect(() => {
    if (!locations) return;

    const formattedLocations = locations.map((l) => ({
      type: l.type,
      latlng: { lat: l.lat, lng: l.lng },
    }));
    setInternalLocations([...formattedLocations]);
  }, [locations]);

  const formatLocations = (internal) => {
    return internal.map((location) => ({
      type: location.type,
      lat: location.latlng.lat,
      lng: location.latlng.lng,
    }));
  };

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      click(e) {
        if (editable) setPosition(e.latlng);
      },
    });

    const AddLocation = (type) => {
      map.closePopup();

      const tempLocations = [...internalLocations, { type, latlng: position }];

      const formattedLocations = formatLocations(tempLocations);
      setLocations([...formattedLocations]);
    };

    return (
      position && (
        <Popup position={position} minWidth={180}>
          <div className="d-flex flex-column">
            <button
              type="button"
              className="btn-dark mb-1"
              onClick={() => AddLocation('farm')}
            >
              Ūkis
            </button>
            <button
              type="button"
              className="btn-dark"
              onClick={() => AddLocation('sellingLocation')}
            >
              Pardavimo vieta
            </button>
          </div>
        </Popup>
      )
    );
  };

  const removeLocation = (location) => {
    const formattedLocations = formatLocations(
      internalLocations.filter((l) => l != location)
    );
    setLocations([...formattedLocations]);
  };

  return (
    <MapContainer center={[55.323, 24.06]} zoom={7} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {internalLocations &&
        internalLocations.map((location, i) => {
          return (
            <Marker
              key={i}
              icon={location.type === 'farm' ? farmIcon : sellingLocationIcon}
              position={location.latlng}
              eventHandlers={{
                click: () => editable && removeLocation(location),
              }}
            />
          );
        })}
      <LocationMarker />
    </MapContainer>
  );
};

export default ShopMap;
