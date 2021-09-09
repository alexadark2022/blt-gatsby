import React from "react";
import { Layout, Section } from "../components";
import { Newsletter } from "../components/Newsletter";
import clsx from "clsx";
import { Listing } from "../components/layout/Listing";
import { ListingCard } from "../components/layout/ListingCard";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  Pagination,
  SortBy,
  RefinementList,
} from "react-instantsearch-dom";
import PageLayout from "../components/layout/PageLayout";
import SearchHit from "../components/my-components/SearchHit";
const searchClient = algoliasearch(
  "E4TS2J6OFT",
  "8878e427a5a3d373a179bab058ca2641"
);

const SearchPage = () => {
  return (
    <Layout>
      <PageLayout
        title="Search"
        smallMargin
        sidebar={
          <>
            <Newsletter />
          </>
        }
      >
        <Section className={clsx("p-5 md:py-10 md:px-7 mb-base2")}>
          <InstantSearch searchClient={searchClient} indexName="Alldata">
            <div className="flex">
              <div className="w-1/3">
                <p className="my-4">Type</p>
                <RefinementList attribute="nodeType" />
                <p className="my-4">Continents</p>
                <RefinementList attribute="commonDataAttributes.textContinent" />
              </div>
              <div className="w-2/3">
                <SearchBox />
                <div className="content">
                  <div className="stats">
                    <Stats />
                  </div>
                  <Hits hitComponent={SearchHit} />
                  <div className="pagination">
                    <Pagination showLast />
                  </div>
                </div>
              </div>
            </div>
          </InstantSearch>
        </Section>
      </PageLayout>
    </Layout>
  );
};

export default SearchPage;
