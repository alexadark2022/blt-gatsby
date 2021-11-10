import React from "react";
import ExperienceMapBox from "./ExperienceMapBox";
import DestinationMapBox from "./DestinationMapBox";
import PlacesToStayMapBox from "./PlacesToStayMapBox";
import getMainLocations from "./getMainLocations";

const DetailPageMap = ({ isMapOpen, closeModal, pageType, data }) => {
  //console.log(data);
  const { title, featuredImage, uri, customDataAttributes } = data || {};
  const {
    experiences,
    recommendations,
    whereToStay,
    destinationGuides,
    itineraries,
    placesToStay,
    destinations,
  } = customDataAttributes || {};

  const mainData = {
    mainLocations: getMainLocations(customDataAttributes),
    title,
    image: featuredImage?.node?.sourceUrl,
    uri: uri,
  };

  return (
    <div className="i">
      {pageType === `experience` ? (
        <ExperienceMapBox
          isMapOpen={isMapOpen}
          closeModal={closeModal}
          mainData={mainData}
          experiences={experiences || null}
          recommendations={recommendations || null}
          whereToStay={whereToStay || null}
        />
      ) : null}
      {pageType === `destination` ? (
        <DestinationMapBox
          isMapOpen={isMapOpen}
          closeModal={closeModal}
          mainData={mainData}
          experiences={experiences || null}
          destinationGuides={destinationGuides || null}
          itineraries={itineraries || null}
          placesToStay={placesToStay || null}
        />
      ) : null}
      {pageType === `placetostay` ? (
        <PlacesToStayMapBox
          isMapOpen={isMapOpen}
          closeModal={closeModal}
          mainData={mainData}
          experiences={experiences || null}
          destinations={destinations || null}
        />
      ) : null}
    </div>
  );
};

export default DetailPageMap;
