import React from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
export default function ShowMarkerBox({
  item,
  handleActiveMarker,
  clusterer,
  activeMarker,
  setActiveMarker,
  className = null,
  color = "#ffffff",
  imageName = "icon-darkblue.png",
}) {
  return (
    <>
      <Marker
        icon={{
          url: `/images/${imageName}`,
          labelOrigin: new window.google.maps.Point(24, -10),
        }}
        position={{
          lat: item.customDataAttributes.latitudeOfLocation1,
          lng: item.customDataAttributes.longitudeOfLocation1,
        }}
        onClick={() => handleActiveMarker(item.id)}
        clusterer={clusterer}
        label={{
          text: item.title,
          color,
          fontSize: "1rem",
          fontWeight: "500",
          className: `${className ? className : ""}`,
        }}
      >
        {activeMarker === item.id ? (
          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
            <a
              href={item.uri}
              target="_blank"
              className="flex flex-col items-center"
            >
              <h3 className="mb-2 text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <img
                className="w-auto h-32 rounded-md"
                src={item.featuredImage.node.sourceUrl}
                alt={item.title}
              />
            </a>
          </InfoWindow>
        ) : null}
      </Marker>
    </>
  );
}
