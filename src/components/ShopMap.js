import { useState, useEffect } from "react";
import { latLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import RemoveItemFromArray from "./RemoveFromArray";

const ShopMap = ({ id, editable = true, createLocations = false }) => {
  const [locations, setLocations] = useState([]);
  const removeItem = RemoveItemFromArray();

  useEffect(() => {
    if (!createLocations) return;

    AddLocationsToShop();
  }, [createLocations]);

  useEffect(() => {
    if (typeof id !== "undefined") {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + id + "/locations", {
        method: "GET",
      })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          let arr = [];
          data.map((d) => {
            var position = latLng(d.lat, d.lng);
            arr.push({ type: "farm", latlng: position });
          });

          setLocations(arr);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, []);

  async function AddLocationsToShop() {
    locations.map((location) => {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + id + "/locations", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    });
  }

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

    return position === null ? null : (
      <Popup position={position} minWidth={180}>
        <div style={{ display: "grid", rowGap: "5px" }}>
          <input
            type="button"
            className="btn-dark"
            value="Ūkis"
            onClick={() => AddLocation("farm")}
          />
          <input
            type="button"
            className="btn-dark"
            value="Pardavimo vieta"
            onClick={() => AddLocation("sellingLocation")}
          />
        </div>
      </Popup>
    );
  };

  const removeLocation = (e) => {
    setLocations(removeItem(locations, e));
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
            position={location.latlng}
            eventHandlers={{
              click: (e) => {
                if (editable) removeLocation(location);
              },
            }}
          />
        );
      })}
      <LocationMarker />
    </MapContainer>
  );
};

export default ShopMap;
