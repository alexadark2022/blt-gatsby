import React from "react";
import CustomRefinementList from "./CustomRefinementList";
import clsx from "clsx";
export default function AllFilters({ facets, mainState }) {
  const shouldVisible = (list) => {
    return !list.includes(mainState);
  };
  //   console.log(mainState);
  //   console.log(facets);
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-between">
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
          {/* <CustomRefinementList
            values={facets["settings"]}
            attribute="settings"
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
            values={facets.factoryThemes}
            attribute="factoryThemes"
            title="THEME"
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
            values={facets.whenAvailables}
            attribute="whenAvailables"
            title="WHEN AVAILABLE"
            className={clsx({ hidden: shouldVisible(["Experience"]) })}
          />

          <CustomRefinementList
            values={facets.bestTimes}
            attribute="bestTimes"
            title="BEST TIME"
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
            values={facets.especiallyFors}
            attribute="especiallyFors"
            title="ESPECIALLY FOR"
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
            values={facets.priceRangePounds}
            attribute="priceRangePounds"
            title="PRICE GUIDE"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.ageGroups}
            attribute="ageGroups"
            title="GREAT FOR..."
            className={clsx({ hidden: shouldVisible(["Experience"]) })}
          />

          <CustomRefinementList
            values={facets.experienceTypes}
            attribute="experienceTypes"
            title="EXPERIENCE TYPE"
            className={clsx({ hidden: shouldVisible(["Experience"]) })}
          />

          <CustomRefinementList
            values={facets.attractionTypes}
            attribute="attractionTypes"
            title="ATTRACTION TYPE"
            className={clsx({ hidden: shouldVisible(["Experience"]) })}
          />

          <CustomRefinementList
            values={facets.activityTypes}
            attribute="activityTypes"
            title="ACTIVITY TYPE"
            className={clsx({ hidden: shouldVisible(["Experience"]) })}
          />

          <CustomRefinementList
            values={facets.eventTypes}
            attribute="eventTypes"
            title="EVENT TYPE"
            className={clsx({ hidden: shouldVisible(["Experience"]) })}
          />

          <CustomRefinementList
            values={facets.standards}
            attribute="standards"
            title="STANDARDS"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.accommodationTypes}
            attribute="accommodationTypes"
            title="ACCOMMODATION TYPE"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.roomTypes}
            attribute="roomTypes"
            title="ROOMTYPE"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.hotelFacilities}
            attribute="hotelFacilities"
            title="HOTEL FACILITIES"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.forFamilies}
            attribute="forFamilies"
            title="FOR FAMILIES"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.allInclusives}
            attribute="allInclusives"
            title="INCLUSIONS"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.skiFacilities}
            attribute="skiFacilities"
            title="SKI FACILITIES"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.hotelBrands}
            attribute="hotelBrands"
            title="HOTEL BRANDS"
            className={clsx({
              hidden: shouldVisible(["PlaceToStay"]),
            })}
          />

          <CustomRefinementList
            values={facets.recommendationTypes}
            attribute="recommendationTypes"
            title="RECOMMENDATION TYPE"
            className={clsx({
              hidden: shouldVisible(["RoundUp"]),
            })}
          />
          <CustomRefinementList
            values={facets.priceRanges}
            attribute="priceRanges"
            title="PRICE GUIDE"
            className={clsx({ hidden: shouldVisible(["Experience"]) })}
          /> */}
        </div>
      </div>
    </>
  );
}
