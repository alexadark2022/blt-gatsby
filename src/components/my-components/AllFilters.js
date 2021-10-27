import React from "react";
import CustomRefinementList from "./CustomRefinementList";
import RatingRefinementList from "./RatingRefinementList";
import clsx from "clsx";
export default function AllFilters({ facets, mainState }) {
  const shouldVisible = (list) => {
    return !list.includes(mainState);
  };
  //   console.log(mainState);
  console.log(facets);
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-between">
          <CustomRefinementList
            values={facets["customDataAttributes.recommendationType"]}
            attribute="customDataAttributes.recommendationType"
            title="Recommendation Type"
            className={clsx({
              hidden: shouldVisible(["RoundUp"]),
            })}
          />
          <RatingRefinementList
            values={facets["customDataAttributes.rating"]}
            attribute="customDataAttributes.rating"
            title="RATING"
            className={clsx({
              hidden: shouldVisible(["All", "Experience"]),
            })}
          />
          <CustomRefinementList
            values={facets["commonDataAttributes.textContinent"]}
            attribute="commonDataAttributes.textContinent"
            title="CONTINENT"
            className={clsx({
              hidden: shouldVisible([
                "All",
                "Experience",
                "PlaceToStay",
                "Destination",
                "RoundUp",
                "Itinerary",
              ]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.setting"]}
            attribute="customDataAttributes.setting"
            title="SETTING"
            className={clsx({
              hidden: shouldVisible([
                "All",
                "Experience",
                "PlaceToStay",
                "Destination",
                "RoundUp",
                "Itinerary",
              ]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.theme"]}
            attribute="customDataAttributes.theme"
            title="THEME"
            className={clsx({
              hidden: shouldVisible([
                "All",
                "Experience",
                "PlaceToStay",
                "RoundUp",
                "Itinerary",
              ]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.whenAvailable"]}
            attribute="customDataAttributes.whenAvailable"
            title="WHEN AVAILABLE"
            className={clsx({ hidden: shouldVisible(["Experience"]) })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.bestTime"]}
            attribute="customDataAttributes.bestTime"
            title="BEST TIME"
            className={clsx({
              hidden: shouldVisible([
                "All",
                "Experience",
                "Destination",
                "Itinerary",
              ]),
            })}
          />
          {/* Who for mising */}
          {/* Price Guide conflict PTS and Experience  */}
          <CustomRefinementList
            values={facets["customDataAttributes.greatFor"]}
            attribute="customDataAttributes.greatFor"
            title="GREAT FOR"
            className={clsx({
              hidden: shouldVisible(["Experience"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.experienceType"]}
            attribute="customDataAttributes.experienceType"
            title="Experience Type"
            className={clsx({
              hidden: shouldVisible(["Experience"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.attractionType"]}
            attribute="customDataAttributes.attractionType"
            title="Attraction Type"
            className={clsx({
              hidden: shouldVisible(["Experience"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.activityType"]}
            attribute="customDataAttributes.activityType"
            title="Activity Type"
            className={clsx({
              hidden: shouldVisible(["Experience"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.eventType"]}
            attribute="customDataAttributes.eventType"
            title="Event Type"
            className={clsx({
              hidden: shouldVisible(["Experience"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.standard"]}
            attribute="customDataAttributes.standard"
            title="Standard"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.starRating"]}
            attribute="customDataAttributes.starRating"
            title="Star Rating"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.accommodationType"]}
            attribute="customDataAttributes.accommodationType"
            title="Accommodation Type"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.roomType"]}
            attribute="customDataAttributes.roomType"
            title="Room Type"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.hotelFacility"]}
            attribute="customDataAttributes.hotelFacility"
            title="Hotel Facility"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.roomFacility"]}
            attribute="customDataAttributes.roomFacility"
            title="Room Facility"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.skiFacilities"]}
            attribute="customDataAttributes.skiFacilities"
            title="Ski Facilities"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />
          <CustomRefinementList
            values={facets["customDataAttributes.brand"]}
            attribute="customDataAttributes.brand"
            title="brand"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />
        </div>
      </div>
    </>
  );
}
