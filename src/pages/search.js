import React, { useState } from "react";
import { Layout, Section } from "../components";
import { Newsletter } from "../components/Newsletter";
import clsx from "clsx";
import { Listing } from "../components/layout/Listing";
import { ListingCard } from "../components/layout/ListingCard";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  InfiniteHits,
  Stats,
  Pagination,
  SortBy,
  RefinementList,
  MenuSelect,
  connectRefinementList,
} from "react-instantsearch-dom";
import PageLayout from "../components/layout/PageLayout";
import SearchHit from "../components/my-components/SearchHit";
import StaticRefinementList from "../components/my-components/MainSearchList";
import SearchBox from "../components/my-components/SearchBox";
import ViewSwitcher from "../components/my-components/ViewSwitcher";
import { IoCloseSharp as Close } from "react-icons/io5";
import { Typo, Button } from "../components/ui-components";
const searchClient = algoliasearch(
  "E4TS2J6OFT",
  "8878e427a5a3d373a179bab058ca2641"
);

const SearchPage = () => {
  const [mainState, setMainState] = useState("All");
  const [view, setView] = useState("");
  console.log(mainState);
  return (
    <Layout>
      <InstantSearch searchClient={searchClient} indexName="Alldata">
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
              "mr-0 lg:mr-7 lg:pl-5 px-5 lg:px-0"
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
              <div className="justify-end hidden w-full md:flex">
                <ViewSwitcher setView={setView} />
              </div>
            </div>
            <SearchHit view={view} />
          </div>

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
                  console.log(false);
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
              <div className="py-4 border-b border-grey2">
                {/* Title */}
                <div className="flex flex-col justify-between">
                  <h4 className="uppercase text-[15px] tracking-wider text-grey5 mb-2">
                    Continents
                  </h4>
                  <RefinementList attribute="commonDataAttributes.textContinent" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* old */}
      </InstantSearch>
    </Layout>
  );
};

export default SearchPage;

// const StaticRefinementList = connectRefinementList(
//   ({ values, currentRefinement, items, refine }) => (
//     <ul className="ais-RefinementList-list">
//       {values.map((staticItem) => {
//         const { isRefined } = items.find(
//           (item) => item.label === staticItem.label
//         ) || {
//           isRefined: false,
//         };
//         const countArray = items.map((item) => {
//           if (item.label === staticItem.label) return item.count;
//           return 0;
//         });
//         const count = countArray.reduce((previousValue, currentValue) => {
//           return previousValue + currentValue;
//         }, 0);
//         return (
//           <li key={staticItem.value}>
//             <label>
//               <input
//                 type="checkbox"
//                 value={staticItem.value}
//                 checked={isRefined}
//                 onChange={(event) => {
//                   const value = event.currentTarget.value;
//                   const next = currentRefinement.includes(value)
//                     ? currentRefinement.filter((current) => current !== value)
//                     : currentRefinement.concat(value);

//                   refine(next);
//                 }}
//               />
//               {staticItem.label}[{count}]
//             </label>
//           </li>
//         );
//       })}
//     </ul>
//   )
// );
