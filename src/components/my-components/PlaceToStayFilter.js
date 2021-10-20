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
  const continentFilter = useStore((state) => state.continentFilter);
  const updateContinentFilter = useStore(
    (state) => state.updateContinentFilter
  );
  const settingFilter = useStore((state) => state.settingFilter);
  const updateSettingFilter = useStore((state) => state.updateSettingFilter);
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
              updateFilter={updateContinentFilter}
              selectedFilters={continentFilter}
              existInData={itemExist.continent}
            />
            <RefinementList
              values={PTSFilters?.allWpSetting?.nodes}
              title="SETTING"
              className="settings"
              updateFilter={updateSettingFilter}
              selectedFilters={settingFilter}
              existInData={itemExist.setting}
            />
            <RefinementList
              values={PTSFilters?.allWpFactoryTheme?.nodes}
              title="THEME"
              className="theme"
            />
            <RefinementList
              values={PTSFilters?.allWpBestTime?.nodes}
              title="BEST TIME"
              className="besttime"
            />
            <RefinementList
              values={PTSFilters?.allWpEspeciallyFor?.nodes}
              title="ESPECIALLY FOR"
              className="esp4"
            />
            <RefinementList
              values={PTSFilters?.allWpRecommendationType?.nodes}
              title="RECOMMENDATION TYPE"
              className="recomendation-type"
            />
          </div>
        </div>
      </WithCollapse>
    </>
  );
}
