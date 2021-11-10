import React, { useState, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

export default function useMapConfig(mainData) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCJkZohj9sqn6H_LrfHMNG5cY794SWFJgA",
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    if (mainData.mainLocations.length == 1) {
      let pt = new window.google.maps.LatLng(mainData.mainLocations[0]);
      map.setCenter(pt);
      map.setZoom(14);
    } else {
      // if not, we set bounds to different locations
      mainData.mainLocations.map((loc) => bounds.extend(loc));
      map.fitBounds(bounds);
    }
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };
  return { isLoaded, options, onUnmount, onLoad };
}
