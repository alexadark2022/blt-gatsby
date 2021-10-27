import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import RefinementList from "./RefinementList";
import { IoCloseSharp as Close } from "react-icons/io5";
import { Typo, WithCollapse, Button } from "../ui-components";
import clsx from "clsx";
import useStore from "./../../store";

export default function PlaceToStayFilter({ openFilters, setOpenFilters }) {
  const PTSFilters = useStaticQuery(graphql`
    query PTS_FILTERS_QUERY {
      allWpRecommendationType {
        nodes {
          name
        }
      }
      allWpContinent {
        nodes {
          name
        }
      }
      allWpSetting {
        nodes {
          name
        }
      }
      allWpFactoryTheme {
        nodes {
          name
        }
      }
      allWpBestTime {
        nodes {
          name
        }
      }
      allWpEspeciallyFor {
        nodes {
          name
        }
      }
      allWpStandard {
        nodes {
          name
        }
      }
      allWpAccommodationType {
        nodes {
          name
        }
      }
      allWpRoomType {
        nodes {
          name
        }
      }
      allWpHotelFacility {
        nodes {
          name
        }
      }
      allWpHotelBrand {
        nodes {
          name
        }
      }
    }
  `);
  const itemExist = useStore((state) => state.itemExist);
  const {
    continentFilter,
    settingFilter,
    themeFilter,
    bestTimeFilter,
    espForFilter,
    recTypeFilter,
  } = useStore((state) => state.allFilters);
  const updateAllFilter = useStore((state) => state.updateAllFilter);
  console.log({
    continentFilter,
    settingFilter,
    themeFilter,
    bestTimeFilter,
    espForFilter,
    recTypeFilter,
  });
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
              values={PTSFilters?.allWpContinent?.nodes}
              title="CONTINENT"
              className="continents"
              updateFilter={(value) =>
                updateAllFilter("continentFilter", value)
              }
              selectedFilters={continentFilter}
              existInData={itemExist?.continent ?? []}
            />
            <RefinementList
              values={PTSFilters?.allWpSetting?.nodes}
              title="SETTING"
              className="settings"
              updateFilter={(value) => updateAllFilter("settingFilter", value)}
              selectedFilters={settingFilter}
              existInData={itemExist?.setting ?? []}
            />
            <RefinementList
              values={PTSFilters?.allWpFactoryTheme?.nodes}
              title="THEME"
              className="theme"
              updateFilter={(value) => updateAllFilter("themeFilter", value)}
              selectedFilters={themeFilter}
              existInData={itemExist?.theme ?? []}
            />
            <RefinementList
              values={PTSFilters?.allWpBestTime?.nodes}
              title="BEST TIME"
              className="besttime"
              updateFilter={(value) => updateAllFilter("bestTimeFilter", value)}
              selectedFilters={bestTimeFilter}
              existInData={itemExist?.bestTime ?? []}
            />
            <RefinementList
              values={PTSFilters?.allWpEspeciallyFor?.nodes}
              title="ESPECIALLY FOR"
              className="esp4"
              updateFilter={(value) => updateAllFilter("espForFilter", value)}
              selectedFilters={espForFilter}
              existInData={itemExist?.espFor ?? []}
            />
            <RefinementList
              values={PTSFilters?.allWpRecommendationType?.nodes}
              title="RECOMMENDATION TYPE"
              className="recomendation-type"
              updateFilter={(value) => updateAllFilter("recTypeFilter", value)}
              selectedFilters={recTypeFilter}
              existInData={itemExist?.recType ?? []}
            />
          </div>
        </div>
      </WithCollapse>
    </>
  );
}
