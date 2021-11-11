import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {  Section, TravelQuote } from "../ui-components"
import { Newsletter } from "../Newsletter"
import clsx from "clsx"
import { Listing } from "../layout/Listing"
import { ListingCard } from "../layout/ListingCard"
import PageLayout from "../layout/PageLayout"
import { Breadcrumbs } from "../Breadcrumbs"



const GET_ALL_WRITERS = graphql`
  query {
    allWpWriter(sort: { fields: title, order: ASC }, limit: 100) {
      nodes {
        ...WriterListing
      }
    }
  }
`


export const WritersPage = () => {
    const data = useStaticQuery(GET_ALL_WRITERS)
    let writers = data?.allWpWriter?.nodes

    const breadcrumbsTerms = [
      { name: "home", link: "/" },
      { name: "About us", link: "/about-us" },
      { name: "Our Writers" },
    ]

    return (
      <>
        <Breadcrumbs terms={breadcrumbsTerms} />

        <PageLayout
          title="Our writers"
          smallMargin
          sidebar={
            <>
              <Newsletter />
            </>
          }
        >
          <Section className={clsx("p-5 md:py-10 md:px-7 mb-base2")}>
            {writers?.map((item) => {
              return (
                <>
                  <Listing
                    key={item.id}
                    item={item}
                    noBl
                    writer
                    className="hidden md:block"
                  />
                  <div className="flex justify-center mb-8 md:hidden">
                    <ListingCard key={item.id} item={item} writer noBl />
                  </div>
                </>
              )
            })}
          </Section>
        </PageLayout>
        {/* Quote */}
        <TravelQuote author="Martin Buber">
          “All journeys have secret destinations of which the traveller is
          unaware.”
        </TravelQuote>
      </>
    )
  }