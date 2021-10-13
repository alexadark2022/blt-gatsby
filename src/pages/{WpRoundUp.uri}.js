import React, { useState, useEffect } from "react"
import { Layout, Section, SocialShare, TravelQuote } from "../components"
import PageLayout from "../components/layout/PageLayout"
import { SidebarFilters } from "../components/sidebar/SidebarFilters"
import clsx from "clsx"
import { window } from "browser-monads"
import { About } from "../components/layout/About"
import { CardsGrid } from "../components/layout/CardsGrid"
import { Listing } from "../components/layout/Listing"
import { ListingCard } from "../components/layout/ListingCard"
import { ViewSwitcher } from "../components/ui-components/ViewSwitcher"
import { graphql } from "gatsby"
import { Breadcrumbs } from "../components/Breadcrumbs"
import PlaceToStayFilter from "../components/my-components/PlaceToStayFilter";
const RoundupPage = ({ data }) => {
  console.log("data", data)
  const { wpRoundUp: roundUp } = data || {}
  const contentType = roundUp.customDataAttributes.type;
  const [view, setView] = useState("list")


  useEffect(() => {
    const isLarge = window.matchMedia("(min-width: 768px)").matches
    isLarge ? setView("list") : setView("grid")
  }, [])

  const url = window.location.href

  const {
    id,
    title,
    commonDataAttributes,
    customDataAttributes,
    modified,
    author,
  } = roundUp || {}

  const { about } = commonDataAttributes || {}
  const { links } = customDataAttributes || {}
  const breadcrumbsTerms = [{ name: "home", link: "/" }, { name: "Round-ups" }]
  return (
    <Layout page="round-up">
   {contentType === "Places to stay" && <PlaceToStayFilter />}
      <Breadcrumbs terms={breadcrumbsTerms} />

      <PageLayout
        title={title}
        smallMargin
        intro="Our round-ups of the best of the best: "
        isFilters
        // openFilters={openFilters}
        // setOpenFilters={setOpenFilters}
        // sidebar={
        //   <SidebarFilters
        //     filtersComponents={
        //       <>
        //         <FiltersCommon filters={filters} />
        //         {roundUpFilterSet.map((filterSet, i) => {
        //           const { title, filters } = filterSet;
        //           return <FilterSet key={i} title={title} filters={filters} />;
        //         })}
        //       </>
        //     }

        //   />
        // }
      >
        <section
          className={clsx(
            "py-5 sm:py-8 my-3 sm:my-base2 px-4 sm:px-7",
            "bg-white border shadow-section border-grey2"
          )}
        >
          <About
            text="Know someone who would like this round-up? Why not let them know…"
            about={about}
            author={author?.node}
            date={modified}
            socialShare={<SocialShare url={url} />}
          />
        </section>
        <div className="justify-end hidden mb-base2 md:flex">
          <ViewSwitcher setView={setView} />
        </div>
        {view === "list" && (
          <Section className={clsx("p-5 md:p-8  mb-base2")}>
            {links?.map((item, i) => {
              const type = item.link[0].__typename

              return (
                <>
                <Listing
                  item={item}
                  key={item.link[0].id}
                  pts={type === "PlaceToStay"}
                  itinerary={type === "Itinerary"}
                  className="hidden md:block"
                />
                <div className="flex justify-center">
                  <ListingCard
                    item={item}
                    key={item.link[0].id}
                    pts={type === "PlaceToStay"}
                    itinerary={type === "Itinerary"}
                    className="md:hidden mb-10"
                  />
                </div>
                </>
              )
            })}
          </Section>
        )}
        {view === "grid" && <CardsGrid cards={links} className="mb-base2" />}
        {view === "map" && "map view here"}
      </PageLayout>
      {/* Quote */}
      <TravelQuote author="Daranna Gidel">
        “You lose sight of things… and when you travel, everything balances
        out.”
      </TravelQuote>
    </Layout>
  )
}
export default RoundupPage

export const pageQuery = graphql`
  query ($uri: String!) {
    wpRoundUp(uri: { eq: $uri }) {
      ...RoundUpPage
    }
  }
`
