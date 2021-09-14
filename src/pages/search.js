import React, { useState, useEffect } from "react";
import { Layout, Section } from "../components";
import clsx from "clsx";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, MenuSelect } from "react-instantsearch-dom";
import SearchHit from "../components/my-components/SearchHit";
import StaticRefinementList from "../components/my-components/MainSearchList";
import SearchBox from "../components/my-components/SearchBox";
import ViewSwitcher from "../components/my-components/ViewSwitcher";
import CustomRefinementList from "../components/my-components/CustomRefinementList";
import ClearAllFilters from "../components/my-components/ClearAllFilters";
import { IoCloseSharp as Close } from "react-icons/io5";
import { Typo, Button, WithCollapse } from "../components/ui-components";

const indexName = "Alldata";
const searchClient = algoliasearch(
  "E4TS2J6OFT",
  "8878e427a5a3d373a179bab058ca2641"
);
let continentsFilter = [];
let nodeType = [];
searchClient
  .searchForFacetValues([
    {
      indexName,
      params: {
        facetName: "nodeType",
        facetQuery: "",
        maxFacetHits: 50,
      },
    },
    {
      indexName,
      params: {
        facetName: "commonDataAttributes.textContinent",
        facetQuery: "",
        maxFacetHits: 50,
      },
    },
  ])
  .then((filters) => {
    nodeType.push(
      ...filters[0].facetHits.map((facet) => ({
        ...facet,
        label: facet.value,
        value: facet.value,
        isRefined: false,
        count: 0,
      }))
    );
    continentsFilter.push(
      ...filters[1].facetHits.map((facet) => ({
        ...facet,
        label: facet.value,
        value: facet.value,
        isRefined: false,
        count: 0,
      }))
    );
  });

const currentRefinement = new Set();
const SearchPage = () => {
  const [mainState, setMainState] = useState("All");
  const [view, setView] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  console.log({ mainState, continentsFilter, nodeType });

  return (
    <Layout>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <SearchBox />
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
              values={nodeType}
              // values={[
              //   { label: "Experience", value: "Experience" },
              //   { label: "PlaceToStay", value: "PlaceToStay" },
              //   { label: "Destination", value: "Destination" },
              //   { label: "RoundUp", value: "RoundUp" },
              //   { label: "Itinerary", value: "Itinerary" },
              // ]}
            />
            <div className="flex items-center justify-between mt-4 mb-4 space-x-2">
              {/* <Select
            options={[
              'Recently added',
              'Most Popular',
              'Price: cheapest first',
              'Price: expensive first',
              'A-Z',
              'Z-A',
            ]}
            defaultValue="Recently added"
          />

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
              <MenuSelect attribute="nodeType" />

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
                <ViewSwitcher setView={setView} />
              </div>
            </div>
            <SearchHit view={view} />
          </div>
          <WithCollapse
            isOpen={openFilters}
            className="duration-500 ease-in-out transition-height"
          >
            <div
              className={clsx(
                "w-full lg:w-[300px]",
                "order-1 lg:order-2",
                "bg-white "
              )}
            >
              <div className="relative px-5 pt-3 pb-10 mb-10 border border-grey2">
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
                <div className="">
                  <div className="flex flex-col justify-between">
                    <CustomRefinementList
                      values={continentsFilter}
                      attribute="commonDataAttributes.textContinent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </WithCollapse>
        </div>
        {/* old */}
      </InstantSearch>
    </Layout>
  );
};

export default SearchPage;
