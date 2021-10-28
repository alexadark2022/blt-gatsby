import React from "react";
import RefinementList from "./RefinementList";
import { IoCloseSharp as Close } from "react-icons/io5";
import { Typo, WithCollapse, Button } from "../ui-components";
import clsx from "clsx";
import useStore from "./../../store";
import filters from "../../utils/FiltersData";
export default function ExperiencesFilter({ openFilters, setOpenFilters }) {
  const itemExist = useStore((state) => state.itemExist);
  const allFilters = useStore((state) => state.allFilters);
  const updateAllFilter = useStore((state) => state.updateAllFilter);
  return (
    <>
      <WithCollapse
        isOpen={openFilters}
        className="duration-500 ease-in-out transition-height"
      >
        <div className={clsx("w-full", "order-1 lg:order-2", "bg-white ")}>
          <div className="lg:max-w-[300px] relative px-5 pt-3 pb-10 mb-10 border border-grey2">
            <div
              className="absolute flex items-center justify-center border-2 cursor-pointer top-4 right-4 w-base2 h-base2 border-lightBlue lg:hidden"
              onClick={(e) => {
                e.preventDefault();
                setOpenFilters(false);
              }}
            >
              <Close className="absolute text-xl text-lightBlue " />
            </div>
            <Typo
              as="h3"
              h3
              className="p-2 mb-2 text-center border-b border-grey2"
            >
              Filter your results
            </Typo>
            <div className="flex justify-center mb-3">
              <Button secondary small>
                Reset all
              </Button>
            </div>
            {/* 
          <RatingRefinementList
            state={mainState}
            values={facets["customDataAttributes.rating"]}
            attribute="customDataAttributes.rating"
            title="RATING"
            className={clsx({
              hidden: shouldVisible(["All", "Experience"]),
            })}
          /> */}
            <RefinementList
              values={filters.continent}
              title="CONTINENT"
              className="continents"
              updateFilter={(value) => updateAllFilter("continent", value)}
              selectedFilters={allFilters.continent ?? []}
              existInData={itemExist?.continent ?? []}
            />

            <RefinementList
              values={filters.setting}
              title="SETTING"
              className="setting"
              updateFilter={(value) => updateAllFilter("setting", value)}
              selectedFilters={allFilters.setting ?? []}
              existInData={itemExist?.setting ?? []}
            />
            <RefinementList
              values={filters.theme}
              title="THEME"
              className="theme"
              updateFilter={(value) => updateAllFilter("theme", value)}
              selectedFilters={allFilters.theme ?? []}
              existInData={itemExist?.theme ?? []}
            />
            <RefinementList
              values={filters.whenAvailable}
              title="WHEN AVAILABLE"
              className="whenAvailable"
              updateFilter={(value) => updateAllFilter("whenAvailable", value)}
              selectedFilters={allFilters.whenAvailable ?? []}
              existInData={itemExist?.whenAvailable ?? []}
            />
            <RefinementList
              values={filters.bestTime}
              title="BEST TIME"
              className="bestTime"
              updateFilter={(value) => updateAllFilter("bestTime", value)}
              selectedFilters={allFilters.bestTime ?? []}
              existInData={itemExist?.bestTime ?? []}
            />
            <RefinementList
              values={filters.whoFor}
              title="Who For"
              className="whoFor"
              updateFilter={(value) => updateAllFilter("whoFor", value)}
              selectedFilters={allFilters.whoFor ?? []}
              existInData={itemExist?.whoFor ?? []}
            />

            <RefinementList
              values={filters.priceGuideExp}
              title="Price Guide"
              className="priceGuideExp"
              updateFilter={(value) => updateAllFilter("priceGuideExp", value)}
              selectedFilters={allFilters.priceGuideExp ?? []}
              existInData={itemExist?.priceGuideExp ?? []}
            />
            {/* Price Guide conflict PTS and Experience  */}
            <RefinementList
              values={filters.greatFor}
              title="GREAT FOR"
              className="greatFor"
              updateFilter={(value) => updateAllFilter("greatFor", value)}
              selectedFilters={allFilters.greatFor ?? []}
              existInData={itemExist?.greatFor ?? []}
            />
            <RefinementList
              values={filters.experienceType}
              title="Experience Type"
              className="experienceType"
              updateFilter={(value) => updateAllFilter("experienceType", value)}
              selectedFilters={allFilters.experienceType ?? []}
              existInData={itemExist?.experienceType ?? []}
            />
            <RefinementList
              values={filters.attractionType}
              title="Attraction Type"
              className="attractionType"
              updateFilter={(value) => updateAllFilter("attractionType", value)}
              selectedFilters={allFilters.attractionType ?? []}
              existInData={itemExist?.attractionType ?? []}
            />
            <RefinementList
              values={filters.activityType}
              title="Activity Type"
              className="activityType"
              updateFilter={(value) => updateAllFilter("activityType", value)}
              selectedFilters={allFilters.activityType ?? []}
              existInData={itemExist?.activityType ?? []}
            />
            <RefinementList
              values={filters.eventType}
              title="Event Type"
              className="eventType"
              updateFilter={(value) => updateAllFilter("eventType", value)}
              selectedFilters={allFilters.eventType ?? []}
              existInData={itemExist?.eventType ?? []}
            />
          </div>
        </div>
      </WithCollapse>
    </>
  );
}
