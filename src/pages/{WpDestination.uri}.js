import React from "react"
import { graphql } from "gatsby"

import {
  CollapseSection,
  Layout,
  SidebarSocialShare,
  SocialShare,
} from "../components"
import PageLayout from "../components/layout/PageLayout"
import { Newsletter } from "../components/Newsletter"
import { window } from "browser-monads"
import SidebarTourOperator from "../components/sidebar/SidebarTourOperator"
import { About } from "../components/layout/About"

const DestinationPage = ({ data }) => {
  const url = window.location.href
  const { wpDestination: destination } = data || {}

  const {
    title,
    modified,
    commonDataAttributes,
    customDataAttributes,
    featuredImage,
    uri,
  } = destination || {}

  const {
    imageGallery,
    review,
    about,
    sidebarTourOperator,
    sbtouroperatordescription,
  } = commonDataAttributes || {}
  const {
    writer,
    bestMonthFrom1,
    bestMonthFrom2,
    bestMonthTo1,
    bestMonthTo2,
    culture,
    foodDrink,
    gettingAround,
    gettingThere,
    healthSafety,
    latitudeOfLocation1,
    longitudeOfLocation1,
    nearestAirport1,
    nearestAirport2,
    nearestAirport3,
    orientation,
    profile,
    region,
    setting,
    whenToGo,
    whereToEat,
    whereToShop,
    whereToStay,
    additionalSections,
    placesToStay,
    tourOperators,
    experiences,
    affiliatedTours,
    destinationGuides,
    itineraries,
  } = customDataAttributes || {}

  const bucketListExperiences = experiences?.filter(
    (exp) => exp.customDataAttributes.isBucketList === "yes"
  )
  const otherExperiences = experiences?.filter(
    (exp) => exp.customDataAttributes.isBucketList === "no"
  )

  const allExperiences = [
    {
      title: "Bucket list experiences",
      experiences: bucketListExperiences,
      id: "experiences",
    },
    { title: "Other experiences", experiences: otherExperiences },
    { title: "Destination tickets & tours", experiences: affiliatedTours },
  ]

  const tabs = [
    { name: "our review" },
    { name: "experiences" },
    { name: "where to stay" },
    { name: "logistics" },
    { name: "who to go with" },
    { name: "map" },
  ]
  return (
    <Layout page="destination">
      <PageLayout
        title={title}
        bl
        item={destination}
        tabs={tabs}
        images={imageGallery}
        intro="Best things to do & places to stay in:"
        sidebar={
          <div className="space-y-base2">
            <Newsletter />
            <SidebarSocialShare url={url} />
            {sidebarTourOperator &&
              sidebarTourOperator.map((to, index) => (
                <SidebarTourOperator
                  key={index}
                  tourOperator={to}
                  description={sbtouroperatordescription}
                />
              ))}
          </div>
        }
      >
        {/* Review */}
        <CollapseSection title="Our review" id="our-review">
          <About
            writer={writer && writer[0]}
            date={modified}
            about={about}
            review={review}
            socialShare={<SocialShare url={url} />}
            text="Know someone who would like this place to stay? Why not let them know…"
          >
            {/* <TitleContent title="Orientation" content={orientation} />
          <TitleContent title="Culture & Customs" content={culture} />
          <TitleContent title="Food & Drink" content={foodDrink} /> */}
          </About>
        </CollapseSection>
      </PageLayout>
    </Layout>
  )
}

export default DestinationPage

export const pageQuery = graphql`
  query ($uri: String!) {
    wpDestination(uri: { eq: $uri }) {
      ...DestinationPage
    }
  }
`
