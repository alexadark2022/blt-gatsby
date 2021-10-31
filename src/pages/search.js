import React, { useState, useEffect, useCallback } from "react";
import { Layout, TravelQuote } from "../components";
import clsx from "clsx";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import SearchHit from "../components/my-components/SearchHit";
import StaticRefinementList from "../components/my-components/MainSearchList";
import SearchBox from "../components/my-components/SearchBox";
import ViewSwitcher from "../components/my-components/ViewSwitcher";
import ClearAllFilters from "../components/my-components/ClearAllFilters";
import AllFilters from "../components/my-components/AllFilters";
import { IoCloseSharp as Close } from "react-icons/io5";
import { Typo, Button, WithCollapse } from "../components/ui-components";
import isEmptyObject from "./../utils/isEmptyObject";
import { Breadcrumbs } from "../components/Breadcrumbs";
import LoaderSpinner from "react-loader-spinner";
import SearchMap from "./../components/maps/SearchMap";

const indexName = "BucketList";
const searchClient = algoliasearch(
  "E4TS2J6OFT",
  "8878e427a5a3d373a179bab058ca2641"
);
const index = searchClient.initIndex("BucketList");
const breadcrumbsTerms = [{ name: "home", link: "/" }, { name: "search" }];

const SearchPage = () => {
  const [mainState, setMainState] = useState("All");
  const [view, setView] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  const facets = useCallback(() => {
    const filtersArray = Object.entries(filters);
    return filtersArray.reduce(function (state, name) {
      const filterName = name[0];
      const itemsArray = Object.entries(name[1]);
      state[filterName] = itemsArray.map((facet) => ({
        label: facet[0],
        value: facet[0],
        isRefined: false,
        count: 0,
      }));
      return state;
    }, {});
  }, [filters]);
  useEffect(() => {
    index
      .search("", {
        facets: ["*"],
      })
      .then((res) => {
        setFilters(res.facets);
      });
  }, []);

  return (
    <Layout>
      <Breadcrumbs terms={breadcrumbsTerms} />
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Configure hitsPerPage={12} />
        <SearchBox />
        {isEmptyObject(facets()) ? (
          <div className="flex items-center justify-center h-[400px]">
            <LoaderSpinner
              type="Rings"
              color="#d3b27d"
              width={150}
              height={150}
            />
          </div>
        ) : (
          <div
            className={clsx(
              "container max-w-big",
              "flex flex-col lg:flex-row ",
              "px-5 md:px-0"
            )}
          >
            <div
              className={clsx(
                "w-full lg:w-2/3 xl:w-[960px]",
                "order-2 lg:order-1",
                "mr-0 lg:mr-7 lg:pl-5 lg:px-0"
              )}
            >
              <StaticRefinementList
                attribute="nodeType"
                setMainState={setMainState}
                values={[
                  { label: "Experience", value: "Experience" },
                  { label: "PlaceToStay", value: "PlaceToStay" },
                  { label: "Destination", value: "Destination" },
                  { label: "RoundUp", value: "RoundUp" },
                  { label: "Itinerary", value: "Itinerary" },
                ]}
              />
              <div className="flex items-center justify-between mt-4 mb-4 space-x-2">
                {/*
          <Button
            small
            className={`w-[125px] lg:!hidden ${openFilters && '!hidden'}`}
            onClick={(e) => {
              e.preventDefault()
              setOpenFilters(true)
            }}
          >
            Filters
          </Button> */}
                {/* <SortBy
                defaultRefinement="BucketList"
                items={[
                  { value: "BucketList", label: "Featured" },
                  { value: "date_timestamp", label: "Price asc." },
                ]}
              />
              <MenuSelect attribute="nodeType" /> */}
                <Button
                  small
                  className={`w-[125px] lg:!hidden ${openFilters && "!hidden"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenFilters(true);
                  }}
                >
                  Filters
                </Button>
                <div className="justify-end hidden w-full md:flex">
                  <ViewSwitcher
                    isClickable={[
                      "Experience",
                      "PlaceToStay",
                      "Destination",
                    ].some((item) => item === mainState)}
                    mapOpen={() => setIsMapOpen(true)}
                    setView={setView}
                  />
                </div>

                <SearchMap
                  isMapOpen={isMapOpen}
                  closeModal={() => setIsMapOpen(false)}
                />
              </div>
              <SearchHit view={view} />
            </div>
            <div
              className={clsx(
                "w-full lg:w-1/3",
                "order-1 lg:order-2",
                "bg-white "
              )}
            >
              <WithCollapse
                isOpen={openFilters}
                className="duration-500 ease-in-out transition-height"
              >
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
                    <ClearAllFilters />
                  </div>
                  {!isEmptyObject(facets()) && (
                    <AllFilters mainState={mainState} facets={facets()} />
                  )}
                </div>
              </WithCollapse>
            </div>
          </div>
        )}
        {/* old */}
      </InstantSearch>
      {/* Quote */}
      <TravelQuote author="Dalai Lama">
        “Once a year, go somewhere you have never been before”
      </TravelQuote>
    </Layout>
  );
};

export default SearchPage;
