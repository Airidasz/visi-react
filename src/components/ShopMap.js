import { useState, useEffect } from "react";
import { latLng, icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import farmLocation from "../assets/farmLocation.png";
import sellingLocation from "../assets/sellingLocation.png";
import { useAlert } from "react-alert";
import RemoveItemFromArray from "./RemoveFromArray";

const ShopMap = ({ id, editable = true, createLocations = false, setDone }) => {
  const [locations, setLocations] = useState([]);
  const removeItem = RemoveItemFromArray();
  const alert = useAlert();
  const farmIcon = icon({ iconUrl: farmLocation, iconSize: (42, 42) });
  const sellingLocationIcon = icon({
    iconUrl: sellingLocation,
    iconSize: (42, 42),
  });

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
          data.forEach((d) => {
            var position = latLng(d.lat, d.lng);
            arr.push({ type: d.type, latlng: position });
          });

          setLocations(arr);
        })
        .catch((error) => {
          alert.error(error);
        });
    }
  }, []);

  function AddLocationsToShop() {
    fetch(process.env.REACT_APP_API_URL + "/shop/" + id + "/locations", {
      method: "DELETE",
      credentials: "include",
    }).then(async (response) => {
      const data = await response;
      if (!response.ok) {
        alert.error(response.statusText);
        return;
      }

      locations.forEach((location) => {
        fetch(process.env.REACT_APP_API_URL + "/shop/" + id + "/locations", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            type: location.type,
            lat: location.latlng.lat,
            lng: location.latlng.lng,
          }),
        }).catch((error) => {
          alert.error(error.statusText);
        });
      });

      setDone(true);
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
            icon={location.type === "farm" ? farmIcon : sellingLocationIcon}
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
