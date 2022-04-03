import React, { useState, useEffect } from 'react';
import { latLng, icon } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import farmLocation from '../assets/farmLocation.png';
import sellingLocation from '../assets/sellingLocation.png';
import { RemoveItemFromArray } from './Extras';
import useApi from './useApi';

const ShopMap = ({ shop, editable, createLocations, shouldLoad = true, onDone = () => {} }) => {
  const [locations, setLocations] = useState([]);

  const { GetRequest, DeleteRequest, PostRequest} = useApi();
  const farmIcon = icon({ iconUrl: farmLocation, iconSize: (42, 42) });
  const sellingLocationIcon = icon({
    iconUrl: sellingLocation,
    iconSize: (42, 42),
  });

  useEffect(() => {
    const getLocations = async () => {
      if(!shop || !shouldLoad)
        return;

      const response = await GetRequest(`shop/${shop.codename}/locations`, null, false);
      if(!response)
        return;

      const data = await response.json();

      const locationData = data.map((d) => ({ type: d.type, latlng: latLng(d.lat, d.lng) }));
      setLocations([...locationData]);
    };

    getLocations();
  }, []);

  useEffect(() => {
    const AddLocationsToShop = async () => {
      const deleteResponse = await DeleteRequest(`shop/${shop.codename}/locations`);
      if(!deleteResponse)
        return;
  
      locations.forEach(async (location) => {
        const body = JSON.stringify({
          type: location.type,
          lat: location.latlng.lat,
          lng: location.latlng.lng,
        });
  
        await PostRequest(`shop/${shop.codename}/locations`, body);
      });
  
      onDone();
    };

    if (!createLocations) return;

    AddLocationsToShop();
  }, [createLocations]);

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      click(e) {
        if (editable) setPosition(e.latlng);
      },
    });

    const AddLocation = (type) => {
      map.closePopup();
      setLocations((locations) => [
        ...locations,
        { type: type, latlng: position },
      ]);
    };

    return position && (
      <Popup position={position} minWidth={180}>
        <div className="d-flex flex-column">
          <button className="btn-dark mb-1" onClick={() => AddLocation('farm')}>Ūkis</button>
          <button className="btn-dark" onClick={() => AddLocation('sellingLocation')}>Pardavimo vieta</button>
        </div>
      </Popup>
    );
  };

  const removeLocation = (location) => {
    // setLocations(RemoveItemFromArray(locations, location));

    setLocations(locations.filter(l => l != location));
  };

  return (
    <MapContainer center={[55.323, 24.06]} zoom={7} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, i) => {
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
