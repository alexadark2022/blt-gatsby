import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { Link } from "gatsby";

declare let google;

const MapBox = ({
  mainData,
  experiences,
  recommendations,
  whereToStay,
}: any) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [showExperiences, setShowExperienes] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showWhereToStay, setShowWhereToStay] = useState(true);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onLoad = (map) => {
    console.log(map, "map instance");
    const bounds = new google.maps.LatLngBounds();
    //Check if there is only one location in array
    if (mainData.mainLocations.length == 1) {
      let pt = new google.maps.LatLng(mainData.mainLocations[0]);
      map.setCenter(pt);
      map.setZoom(14);
    } else {
      // if not, we set bounds to different locations
      mainData.mainLocations.map((loc) => bounds.extend(loc));
      map.fitBounds(bounds);
    }
  };
  console.log(experiences, "data map");

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };

  return (
    <>
      <div className="mb-3">
        <label className="inline-flex items-center mr-3 cursor-pointer">
          <input
            onChange={() => setShowExperienes(!showExperiences)}
            type="checkbox"
            className="w-5 h-5 form-checkbox text-darkBlue"
            checked={showExperiences}
          />
          <span className="ml-2 text-gray-700">Experiences</span>
        </label>

        <label className="inline-flex items-center mr-3 cursor-pointer">
          <input
            onChange={() => setShowRecommendations(!showRecommendations)}
            type="checkbox"
            className="w-5 h-5 text-green-600 form-checkbox"
            checked={showRecommendations}
          />
          <span className="ml-2 text-gray-700">Recommendations</span>
        </label>

        <label className="inline-flex items-center mr-3 cursor-pointer">
          <input
            onChange={() => setShowWhereToStay(!showWhereToStay)}
            type="checkbox"
            className="w-5 h-5 form-checkbox text-lightBlue"
            checked={showWhereToStay}
          />
          <span className="ml-2 text-gray-700">Where To Stay</span>
        </label>
      </div>
      <GoogleMap
        onLoad={onLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={14}
      >
        <MarkerClusterer options={options}>
          {(clusterer) => (
            <>
              {mainData.mainLocations.map((loc) => (
                <Marker
                  key={loc.lat}
                  position={loc}
                  icon={{
                    url: "/images/icon-pastel.png",
                    labelOrigin: new google.maps.Point(24, -10),
                  }}
                  onClick={() => handleActiveMarker(loc.lat)}
                  label={{
                    text: mainData.title,
                    color: "#FDA658",
                    fontSize: "1rem",
                    fontWeight: "900",
                    className: "green-marker",
                  }}
                >
                  {activeMarker === loc.lat ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <Link
                        to={mainData.uri}
                        className="flex flex-col items-center"
                      >
                        <h3 className="mb-2 text-xl font-semibold text-primary">
                          {mainData.title}
                        </h3>
                        <img
                          className="w-auto h-32 rounded-md"
                          src={mainData.image}
                          alt={mainData.title}
                        />
                      </Link>
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))}
              {experiences &&
                showExperiences &&
                experiences.map((item) => (
                  <Marker
                    key={item.id}
                    icon={{
                      url: "/images/icon-darkblue.png",
                      labelOrigin: new google.maps.Point(24, -5),
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
                      className: "top:10px;",
                    }}
                  >
                    {activeMarker === item.id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <Link
                          to={item.uri}
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
                        </Link>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                ))}
              {recommendations &&
                showRecommendations &&
                recommendations.map((item) => (
                  <Marker
                    key={item.id}
                    icon={{
                      url: "/images/icon-green.png",
                      labelOrigin: new google.maps.Point(24, -10),
                    }}
                    position={{
                      lat: item.customDataAttributes.latitudeOfLocation1,
                      lng: item.customDataAttributes.longitudeOfLocation1,
                    }}
                    onClick={() => handleActiveMarker(item.id)}
                    clusterer={clusterer}
                    label={{
                      text: item.title,
                      color: "#059669",
                      fontSize: "1rem",
                      fontWeight: "900",
                      className: "green-marker",
                    }}
                  >
                    {activeMarker === item.id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <Link
                          to={item.uri}
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
                        </Link>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                ))}
              {whereToStay &&
                showWhereToStay &&
                whereToStay.map((item) => (
                  <Marker
                    key={item.id}
                    icon={{
                      url: "/images/icon-lightblue.png",
                      labelOrigin: new google.maps.Point(24, -10),
                    }}
                    position={{
                      lat: item.customDataAttributes.latitudeOfLocation1,
                      lng: item.customDataAttributes.longitudeOfLocation1,
                    }}
                    onClick={() => handleActiveMarker(item.id)}
                    clusterer={clusterer}
                    label={{
                      text: item.title,
                      color: "#A9E8FF",
                      fontSize: "1rem",
                      fontWeight: "900",
                      className: "green-marker",
                    }}
                  >
                    {activeMarker === item.id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <Link
                          to={item.uri}
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
                        </Link>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                ))}
              )
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </>
  );
};

export default MapBox;
