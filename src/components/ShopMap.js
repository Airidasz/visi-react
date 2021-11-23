import { useState, useEffect } from "react";
import { latLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const ShopMap = ({ id, editable = true, createLocations = false }) => {
  const [farms, setFarms] = useState([]);
  const [sellingLocations, setSellingLocations] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!createLocations) return;

    AddLocationsToShop();
  }, [createLocations]);

  if (!loaded && typeof id !== "undefined") {
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
          var d = latLng(d.lat, d.lng);
          arr.push(d);
        });

        setSellingLocations(arr);

        setLoaded(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const removeFarm = (e) => {
    var array = [...farms]; // make a separate copy of the array
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setFarms(array);
    }
  };

  const removeSellingLocation = (e) => {
    var array = [...sellingLocations]; // make a separate copy of the array
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setSellingLocations(array);
    }
  };

  async function AddLocationsToShop() {
    farms.map((farm) => {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + id + "/locations", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          lat: farm.lat,
          lng: farm.lng,
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

    sellingLocations.map((sellingLocation) => {
      fetch(process.env.REACT_APP_API_URL + "/shop/" + id + "/locations", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          lat: sellingLocation.lat,
          lng: sellingLocation.lng,
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

    const AddSellingLocation = () => {
      map.closePopup();
      setSellingLocations((sellingLocations) => [
        ...sellingLocations,
        position,
      ]);
    };

    const AddFarm = () => {
      map.closePopup();
      setFarms((farms) => [...farms, position]);
    };

    return position === null ? null : (
      <Popup position={position} minWidth={180}>
        <div style={{ display: "grid", rowGap: "5px" }}>
          <input
            type="button"
            className="btn-dark"
            value="Ūkis"
            onClick={AddFarm}
          />
          <input
            type="button"
            className="btn-dark"
            value="Pardavimo vieta"
            onClick={AddSellingLocation}
          />
        </div>
      </Popup>
    );
  };

  return (
    <MapContainer center={[55.323, 24.06]} zoom={7} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {farms.map((farm) => {
        return (
          <Marker
            key={farm.toString()}
            position={farm}
            eventHandlers={{
              click: (e) => {
                if (editable) removeFarm(e.latlng);
              },
            }}
          />
        );
      })}
      {sellingLocations.map((sellingLocation) => {
        return (
          <Marker
            key={sellingLocation.toString()}
            position={sellingLocation}
            eventHandlers={{
              click: (e) => {
                if (editable) removeSellingLocation(e.latlng);
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
