import React from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { Link } from "gatsby";
export default function ShowMarkerBox({
  item,
  handleActiveMarker,
  clusterer,
  activeMarker,
  setActiveMarker,
}) {
  return (
    <>
      <Marker
        icon={{
          url: "/images/icon-darkblue.png",
          labelOrigin: new window.google.maps.Point(24, -5),
        }}
        position={{
          lat: item.customDataAttributes.latitudeOfLocation1,
          lng: item.customDataAttributes.longitudeOfLocation1,
        }}
        onClick={() => handleActiveMarker(item.id)}
        clusterer={clusterer}
        label={{
          text: item.title,
          color: "#3A8DE1",
          fontSize: "1rem",
          fontWeight: "500",
          className: "green-marker",
        }}
      >
        {activeMarker === item.id ? (
          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
            <Link to={item.uri} className="flex flex-col items-center">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <img
                className="w-auto h-32 rounded-md"
                src={item.featuredImage.node.sourceUrl}
                alt={item.title}
              />
            </Link>
          </InfoWindow>
        ) : null}
      </Marker>
    </>
  );
}
