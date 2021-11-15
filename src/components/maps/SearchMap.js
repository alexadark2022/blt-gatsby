import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  MarkerClusterer,
} from "@react-google-maps/api";
import { IoCloseCircle } from "react-icons/io5";
import { connectSearchBox } from "react-instantsearch-dom";
import { Modal } from "..";
import FormatMapsData from "./FormatMapsData";
import algoliasearch from "algoliasearch/lite";
const searchClient = algoliasearch(
  "E4TS2J6OFT",
  "8878e427a5a3d373a179bab058ca2641"
);
const index = searchClient.initIndex("BucketList");

function SearchMap(props) {
  //console.log(props);
  const { mainState, currentRefinement } = props;
  const [hits, setHits] = useState(null);
  useEffect(() => {
    index
      .search(currentRefinement, {
        facetFilters: mainState === "All" ? [] : [`nodeType:${mainState}`],
        hitsPerPage: 100,
      })
      .then(({ hits }) => {
        setHits(hits);
        console.log({ searchText: currentRefinement, mainState, hits });
      });
  }, [mainState, currentRefinement]);
  if (!hits) {
    return null;
  }
  return (
    <>
      <SearchMapBox {...props} hits={hits} />
    </>
  );
}

const SearchMapBox = ({ isMapOpen, closeModal, hits, mainState }) => {
  const allMapPoints = FormatMapsData(hits);
  //console.log(allMapPoints);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCJkZohj9sqn6H_LrfHMNG5cY794SWFJgA",
  });

  const [map, setMap] = useState(null);
  const [pointerColor, setPointerColor] = useState(`icon-pastel.png`);
  const [pointerTextColor, setPointerTextColor] = useState(`#D3B27D`);
  useEffect(() => {
    if (mainState === "Destination") {
      setPointerColor(`icon-pastel.png`);
      setPointerTextColor(`#D3B27D`);
    }
    if (mainState === `PlaceToStay`) {
      setPointerColor(`icon-lightblue.png`);
      setPointerTextColor(`#A9E8FF`);
    }
    if (mainState === `Experience`) {
      setPointerColor(`icon-darkblue.png`);
      setPointerTextColor(`#3A8DE1`);
    }
  }, [mainState]);

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      if (allMapPoints.length == 1) {
        let pt = new window.google.maps.LatLng(allMapPoints[0].position);
        map.setCenter(pt);
        map.setZoom(14);
      } else {
        // if not, we set bounds to different locations
        allMapPoints.map((loc) => bounds.extend(loc.position));
        map.fitBounds(bounds);
      }
      setMap(map);
    },
    [allMapPoints]
  );

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };
  return (
    <Modal isOpen={isMapOpen} closeModal={closeModal}>
      <div
        style={{ height: "90vh" }}
        className="inline-block z-[100] px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle md:w-5/6 sm:p-6"
      >
        <div className="w-full h-full ">
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
                    {allMapPoints.map((loc) => (
                      <Marker
                        clusterer={clusterer}
                        key={loc.id}
                        position={loc.position}
                        icon={{
                          url: `/images/${pointerColor}`,
                          labelOrigin: new window.google.maps.Point(24, -10),
                        }}
                        onClick={() => handleActiveMarker(loc.position.lat)}
                        label={{
                          text: loc.title,
                          color: pointerTextColor,
                          fontSize: "1rem",
                          fontWeight: "900",
                          className: "green-marker",
                        }}
                      >
                        {activeMarker === loc.position.lat ? (
                          <InfoWindow
                            onCloseClick={() => setActiveMarker(null)}
                          >
                            <a
                              href={loc.uri}
                              target="_blank"
                              className="flex flex-col items-center"
                            >
                              <h3 className="mb-2 text-xl font-semibold text-primary">
                                {loc.title}
                              </h3>
                              <img
                                className="w-auto h-32 rounded-md"
                                src={loc.image}
                                alt={loc.title}
                              />
                            </a>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ))}
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

export default connectSearchBox(SearchMap);
