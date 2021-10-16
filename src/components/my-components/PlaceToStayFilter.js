import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import RefinementList from "./RefinementList";
import { IoCloseSharp as Close } from "react-icons/io5";
import { Typo, WithCollapse, Button } from "../ui-components";
import clsx from "clsx";

export default function PlaceToStayFilter({ openFilters, setOpenFilters }) {
  const PTSFilters = useStaticQuery(graphql`
    query PTS_FILTERS_QUERY {
      allWpContinent {
        nodes {
          name
          slug
        }
      }
      allWpSetting {
        nodes {
          name
          slug
        }
      }
      allWpFactoryTheme {
        nodes {
          name
          slug
        }
      }
      allWpBestTime {
        nodes {
          name
          slug
        }
      }
      allWpEspeciallyFor {
        nodes {
          name
          slug
        }
      }
      allWpStandard {
        nodes {
          name
          slug
        }
      }
      allWpAccommodationType {
        nodes {
          name
          slug
        }
      }
      allWpRoomType {
        nodes {
          name
          slug
        }
      }
      allWpHotelFacility {
        nodes {
          name
          slug
        }
      }
      allWpHotelBrand {
        nodes {
          name
          slug
        }
      }
    }
  `);
  console.log(PTSFilters);
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
            />
            <RefinementList
              values={PTSFilters?.allWpContinent?.nodes}
              title="SETTING"
              className="settings"
            />
            <RefinementList
              values={PTSFilters?.allWpContinent?.nodes}
              title="THEME"
              className="theme"
            />
            <RefinementList
              values={PTSFilters?.allWpContinent?.nodes}
              title="BEST TIME"
              className="besttime"
            />
            <RefinementList
              values={PTSFilters?.allWpContinent?.nodes}
              title="ESPECIALLY FOR"
              className="esp4"
            />
            <RefinementList
              values={PTSFilters?.allWpContinent?.nodes}
              title="RECOMMENDATION TYPE"
              className="recomendation-type"
            />
          </div>
        </div>
      </WithCollapse>
    </>
  );
}
