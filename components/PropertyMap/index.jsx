"use client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "../Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  setDefaults({
    key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Your API key here.
    language: "en", // Default language for responses.
    region: "pk", // Default region for responses.
  });
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fromAddress(
          `${property?.location?.street} ${property?.location?.city} ${property?.location?.state} ${property?.location?.zipcode}`
        );
        if (response?.results?.length === 0) {
          setGeoCodeError(true);
          setLoading(false);
          return;
        }
        const { lat, lng } = response?.results[0]?.geometry?.location;
        setLng(lng);
        setLat(lat);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeoCodeError(true);
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);
  if (loading) return <Spinner loading={loading} />;

  //Handle the case where no location data found
  if (geoCodeError) {
    return <div className="text-xl">No Location data found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: "500" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
