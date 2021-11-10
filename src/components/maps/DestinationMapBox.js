import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { IoCloseCircle } from "react-icons/io5";
import { Modal } from "..";
import { Link } from "gatsby";
import ShowMarkerBox from "./ShowMarkerBox";
import useMapConfig from "./../../lib/hooks/useMapConfig";
import TickBox from "./TickBox";

const DestinationMapBox = ({
  isMapOpen,
  closeModal,
  mainData,
  experiences,
  destinationGuides,
  itineraries,
  placesToStay,
}) => {
  const { isLoaded, options, onUnmount, onLoad } = useMapConfig(mainData);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const [showExperiences, setShowExperienes] = useState(false);
  const [showDestinationGuides, setShowDestinationGuides] = useState(false);
  const [showItineraries, setShowItineraries] = useState(false);
  const [showPlacesToStay, setShowPlacesToStay] = useState(false);

  return (
    <Modal isOpen={isMapOpen} closeModal={closeModal}>
      <div
        style={{ height: "90vh" }}
        className="inline-block z-[100] px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle md:w-5/6 sm:p-6"
      >
        <div className="mb-3">
          <TickBox
            show={experiences}
            name="Experiences"
            checked={showExperiences}
            onChange={() => setShowExperienes(!showExperiences)}
          />
          <TickBox
            show={destinationGuides}
            name="Destination Guides"
            checked={showDestinationGuides}
            onChange={() => setShowDestinationGuides(!showDestinationGuides)}
          />
          <TickBox
            show={itineraries}
            name="Itineraries"
            checked={showItineraries}
            onChange={() => setShowItineraries(!showItineraries)}
          />
          <TickBox
            show={placesToStay}
            name="Show Places To Stay"
            checked={showPlacesToStay}
            onChange={() => setShowPlacesToStay(!showPlacesToStay)}
          />
        </div>
        <div className="w-full h-full pb-10">
          {isLoaded ? (
            <GoogleMap
              onLoad={onLoad}
              onUnmount={onUnmount}
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
                          labelOrigin: new window.google.maps.Point(24, -10),
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
                          <InfoWindow
                            onCloseClick={() => setActiveMarker(null)}
                          >
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
                      experiences.map(
                        (item) =>
                          item?.customDataAttributes?.latitudeOfLocation1 && (
                            <ShowMarkerBox
                              key={item.id}
                              item={item}
                              handleActiveMarker={handleActiveMarker}
                              clusterer={clusterer}
                              activeMarker={activeMarker}
                              setActiveMarker={setActiveMarker}
                            />
                          )
                      )}
                    {destinationGuides &&
                      showDestinationGuides &&
                      destinationGuides.map(
                        (item) =>
                          item?.customDataAttributes?.latitudeOfLocation1 && (
                            <ShowMarkerBox
                              key={item.id}
                              item={item}
                              handleActiveMarker={handleActiveMarker}
                              clusterer={clusterer}
                              activeMarker={activeMarker}
                              setActiveMarker={setActiveMarker}
                            />
                          )
                      )}
                    {itineraries &&
                      showItineraries &&
                      itineraries.map(
                        (item) =>
                          item?.customDataAttributes?.latitudeOfLocation1 && (
                            <ShowMarkerBox
                              key={item.id}
                              item={item}
                              handleActiveMarker={handleActiveMarker}
                              clusterer={clusterer}
                              activeMarker={activeMarker}
                              setActiveMarker={setActiveMarker}
                            />
                          )
                      )}
                    {placesToStay &&
                      showPlacesToStay &&
                      placesToStay.map(
                        (item) =>
                          item?.customDataAttributes?.latitudeOfLocation1 && (
                            <ShowMarkerBox
                              key={item.id}
                              item={item}
                              handleActiveMarker={handleActiveMarker}
                              clusterer={clusterer}
                              activeMarker={activeMarker}
                              setActiveMarker={setActiveMarker}
                            />
                          )
                      )}
                    )
                  </>
                )}
              </MarkerClusterer>
            </GoogleMap>
          ) : null}
        </div>

        <button
          className="absolute text-4xl cursor-pointer top-4 right-4 hover:text-gray-700"
          onClick={closeModal}
        >
          <IoCloseCircle />
        </button>
      </div>
    </Modal>
  );
};

export default DestinationMapBox;
