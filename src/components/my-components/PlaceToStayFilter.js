import React from "react";
import RefinementList from "./RefinementList";
import { IoCloseSharp as Close } from "react-icons/io5";
import { Typo, WithCollapse, Button } from "../ui-components";
import clsx from "clsx";
import useStore from "./../../store";
import filters from "../../utils/FiltersData";
export default function PlaceToStayFilter({ openFilters, setOpenFilters }) {
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
              attribute="customDataAttributes.setting"
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
              values={filters.whoFor}
              title="Who For"
              className="whoFor"
              updateFilter={(value) => updateAllFilter("whoFor", value)}
              selectedFilters={allFilters.whoFor ?? []}
              existInData={itemExist?.whoFor ?? []}
            />
            <RefinementList
              values={filters.priceGuide}
              title="Price Guide"
              className="priceGuide"
              updateFilter={(value) => updateAllFilter("priceGuide", value)}
              selectedFilters={allFilters.priceGuide ?? []}
              existInData={itemExist?.priceGuide ?? []}
            />

            <RefinementList
              values={filters.standard}
              title="Standard"
              className="standard"
              updateFilter={(value) => updateAllFilter("standard", value)}
              selectedFilters={allFilters.standard ?? []}
              existInData={itemExist?.standard ?? []}
            />
            <RefinementList
              values={filters.starRating}
              title="Star Rating"
              className="starRating"
              updateFilter={(value) => updateAllFilter("starRating", value)}
              selectedFilters={allFilters.starRating ?? []}
              existInData={itemExist?.starRating ?? []}
            />
            <RefinementList
              values={filters.accommodationType}
              title="Accommodation Type"
              className="accommodationType"
              updateFilter={(value) =>
                updateAllFilter("accommodationType", value)
              }
              selectedFilters={allFilters.accommodationType ?? []}
              existInData={itemExist?.accommodationType ?? []}
            />
            <RefinementList
              values={filters.roomType}
              title="Room Type"
              className="roomType"
              updateFilter={(value) => updateAllFilter("roomType", value)}
              selectedFilters={allFilters.roomType ?? []}
              existInData={itemExist?.roomType ?? []}
            />
            <RefinementList
              values={filters.hotelFacility}
              title="Hotel Facility"
              className="hotelFacility"
              updateFilter={(value) => updateAllFilter("hotelFacility", value)}
              selectedFilters={allFilters.hotelFacility ?? []}
              existInData={itemExist?.hotelFacility ?? []}
            />
            <RefinementList
              values={filters.roomFacility}
              title="Room Facility"
              className="roomFacility"
              updateFilter={(value) => updateAllFilter("roomFacility", value)}
              selectedFilters={allFilters.roomFacility ?? []}
              existInData={itemExist?.roomFacility ?? []}
            />
            <RefinementList
              values={filters.forFamilies}
              title="For Families"
              className="forFamilies"
              updateFilter={(value) => updateAllFilter("forFamilies", value)}
              selectedFilters={allFilters.forFamilies ?? []}
              existInData={itemExist?.forFamilies ?? []}
            />
            {/* {Inclusions missing} */}
            <RefinementList
              values={filters.skiFacilities}
              title="Ski Facilities"
              className="skiFacilities"
              updateFilter={(value) => updateAllFilter("skiFacilities", value)}
              selectedFilters={allFilters.skiFacilities ?? []}
              existInData={itemExist?.skiFacilities ?? []}
            />
            <RefinementList
              values={filters.brand}
              title="brand"
              className="brand"
              updateFilter={(value) => updateAllFilter("brand", value)}
              selectedFilters={allFilters.brand ?? []}
              existInData={itemExist?.brand ?? []}
            />
          </div>
        </div>
      </WithCollapse>
    </>
  );
}
