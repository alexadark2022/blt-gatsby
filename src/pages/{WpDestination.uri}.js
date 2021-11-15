import React, { useState } from "react";
import { graphql } from "gatsby";

import {
  CollapseSection,
  Layout,
  SidebarSocialShare,
  SocialShare,
  TravelQuote,
} from "../components";
import PageLayout from "../components/layout/PageLayout";
import { Newsletter } from "../components/Newsletter";
import { window } from "browser-monads";
import SidebarTourOperator from "../components/sidebar/SidebarTourOperator";
import { About } from "../components/layout/About";
import { TitleContent } from "../components/layout/TitleContent";
import { CollapseListings } from "../components/layout/CollapseListings";
import { IntroText } from "../components/layout/IntroText";
import { CollapseCards } from "../components/layout/CollapseCards";
import { useRecentlyViewed } from "../lib/hooks/useRecentlyViewed";
import { Breadcrumbs } from "../components/Breadcrumbs";
import slugify from "slugify";
import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import { useSeoGeneral } from "../lib/hooks/useSeoGeneral";
import DetailPageMap from "./../components/maps/DetailPageMap";
import { useDdestinationsArray } from "../lib/hooks/useDestinationsArray";
import { AffiliateListing } from "../components/layout/AffiliateListing";

const slugs = (string) => slugify(string, { lower: true, strict: true });

const DestinationPage = ({ data }) => {
  const url = window.location.href;
  const { wpDestination: destination } = data || {};

  const seoGeneral = useSeoGeneral();

  const {
    title,
    modified,
    commonDataAttributes,
    customDataAttributes,
    featuredImage,
    uri,
    viAffiliate,
  } = destination || {};
  const seoImage = featuredImage?.node.localFile.childImageSharp.original;

  const seo = {
    page: destination?.seo,
    general: seoGeneral?.wp?.seo,
  };

  const rvData = { title, featuredImage, uri };
  useRecentlyViewed(rvData);

  const {
    imageGallery,
    review,
    about,
    sidebarTourOperator,
    sbtouroperatordescription,
    continent,
    country,
  } = commonDataAttributes || {};
  const {
    writer,
    culture,
    foodDrink,
    gettingAround,
    gettingThere,
    healthSafety,
    orientation,
    region,
    whenToGo,
    whereToEat,
    whereToShop,
    whereToStay,
    additionalSections,
    placesToStay,
    tourOperators,
    experiences,
    destinationGuides,
    itineraries,
  } = customDataAttributes || {};

  const bucketListExperiences = experiences?.filter(
    (exp) => exp.customDataAttributes.isBucketList === "yes"
  );
  const otherExperiences = experiences?.filter(
    (exp) => exp.customDataAttributes.isBucketList === "no"
  );

  const allExperiences = [
    {
      title: "Bucket list experiences",
      experiences: bucketListExperiences,
      id: "experiences",
    },
    { title: "Other experiences", experiences: otherExperiences },
    // { title: "Destination tickets & tours", experiences: affiliatedTours },
  ];

  const tabs = [
    { name: "our review" },
    { name: "experiences" },
    { name: "where to stay" },
    { name: "logistics" },
    { name: "who to go with" },
    { name: "map" },
  ];

  const brContinent = continent?.length === 1 ? continent[0] : null;
  const destinationsArray = useDdestinationsArray();

  const breadcrumbsTerms = [
    { name: "home", link: "/" },
    { name: brContinent, link: `/search/?q=${brContinent}` },
    { name: country?.name, link: `/search/?q=${country?.name}` },
    {
      name: region,
      link: destinationsArray.includes(region?.toLowerCase())
        ? `/destination/${region && slugs(region)}`
        : `/search/?q=${region}`,
    },
  ].filter((term) => term.name);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <Layout page="destination">
      <Seo
        title={title}
        uri={uri}
        yoastSeo={true}
        seo={seo}
        featuredImage={
          seoImage && {
            src: seoImage.src,
            width: seoImage.width,
            height: seoImage.height,
          }
        }
      />
      <Breadcrumbs terms={breadcrumbsTerms} />
      <DetailPageMap
        isMapOpen={isMapOpen}
        closeModal={() => setIsMapOpen(false)}
        pageType="destination"
        data={destination}
      />
      <PageLayout
        title={title}
        bl
        item={destination}
        tabs={tabs}
        mapOpen={() => setIsMapOpen(true)}
        images={imageGallery}
        intro="Best things to do & places to stay in:"
        sidebar={
          <div className="h-full space-y-base2">
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
            <TitleContent title="Orientation" content={orientation} />
            <TitleContent title="Culture & Customs" content={culture} />
            <TitleContent title="Food & Drink" content={foodDrink} />
          </About>
        </CollapseSection>

        {/* Experiences */}
        {experiences &&
          allExperiences?.map((exp) => {
            const { title, experiences, id } = exp;
            if (experiences === null || experiences?.length === 0) {
              return;
            }
            return (
              <CollapseSection
                key={id}
                title={title}
                number={experiences?.length}
                id={id}
                listings
              >
                <div className="mt-5">
                  <CollapseListings listings={experiences} />
                  <CollapseCards cards={experiences} className="md:hidden" />
                </div>
              </CollapseSection>
            );
          })}
        {viAffiliate?.length > 0 && (
          <CollapseSection
            title="Destination Tickets & tours"
            number={viAffiliate.length}
          >
            <div className="mt-5">
              {viAffiliate.map((item) => {
                const parsedItem = JSON.parse(item);
                console.log("parsedItem", parsedItem);
                return (
                  <AffiliateListing
                    item={parsedItem}
                    key={parsedItem.product_code}
                  />
                );
              })}
            </div>
          </CollapseSection>
        )}
        {/* Where to stay */}
        {placesToStay && (
          <CollapseSection
            title="Where to stay"
            number={placesToStay?.length}
            id="where-to-stay"
            listings
          >
            <IntroText content={whereToStay} />
            <div className="">
              <CollapseListings listings={placesToStay} pts />
              <CollapseCards cards={placesToStay} className="md:hidden" pts />
            </div>
          </CollapseSection>
        )}

        {/* Travel advice */}
        <CollapseSection title="Travel advice" id="logistics">
          <div className="space-y-base2">
            <TitleContent title="When to go" content={whenToGo} />
            <TitleContent
              title="Getting there and away"
              content={gettingThere}
            />
            <TitleContent title="Getting around" content={gettingAround} />

            <TitleContent title="Where to eat or drink" content={whereToEat} />
            <TitleContent title="Where to shop" content={whereToShop} />
            <TitleContent title="Health & Safety" content={healthSafety} />
            {additionalSections?.map((section, i) => {
              const { title, content } = section;
              return <TitleContent key={i} title={title} content={content} />;
            })}
          </div>
        </CollapseSection>
        {/* Tour operators */}
        {tourOperators && (
          <CollapseSection
            title="Who to go with: tour operators"
            number={tourOperators?.length}
            id="who-to-go-with"
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={tourOperators} noBl />
              <CollapseCards cards={tourOperators} className="md:hidden" noBl />
            </div>
          </CollapseSection>
        )}
        {/* Recommended itineraries */}
        {itineraries && (
          <CollapseSection
            title="Recommended itineraries"
            number={itineraries.length}
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={itineraries} itinerary />
              <CollapseCards
                cards={itineraries}
                className="md:hidden"
                itineraries
              />
            </div>
          </CollapseSection>
        )}
        {/* Destination guides */}
        {destinationGuides && (
          <CollapseSection
            title="Destination guides"
            number={destinationGuides.length}
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={destinationGuides} destinationGuide />
              <CollapseCards cards={destinationGuides} className="md:hidden" />
            </div>
          </CollapseSection>
        )}
      </PageLayout>

      {/* Quote */}
      <TravelQuote author="J. R. R. Tolkien">
        “All that is gold does not glitter and not all those who wander are
        lost”
      </TravelQuote>
    </Layout>
  );
};

export default DestinationPage;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpDestination(uri: { eq: $uri }) {
      ...DestinationPage
    }
  }
`;
