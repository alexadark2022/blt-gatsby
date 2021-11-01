import React, { useState } from "react";
import { graphql } from "gatsby";

import { useRecentlyViewed } from "../lib/hooks/useRecentlyViewed";
import { window } from "browser-monads";
import PageLayout from "../components/layout/PageLayout";
import SidebarTourOperator from "../components/sidebar/SidebarTourOperator";
import { Newsletter } from "../components/Newsletter";
import { SidebarSocialShare, SocialShare } from "../components/social";
import clsx from "clsx";
import { CollapseSection, Layout, TravelQuote } from "../components";
import { About } from "../components/layout/About";

import { CollapseListings } from "../components/layout/CollapseListings";
import { TitleContent } from "../components/layout/TitleContent";
import { CollapseCards } from "../components/layout/CollapseCards";
import ExperienceMap from "../components/maps/ExperienceMap";
import { Loader } from "@googlemaps/js-api-loader";
import { Breadcrumbs } from "../components/Breadcrumbs";
import slugify from "slugify";
import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import { useSeoGeneral } from "../lib/hooks/useSeoGeneral";
import { useDdestinationsArray } from "../lib/hooks/useDestinationsArray";


const slugs = (string) => slugify(string, { lower: true, strict: true });

const ExperiencePage = ({ data }) => {
  const [loadMap, setLoadMap] = useState(false);
  const loader = new Loader({
    apiKey: "AIzaSyCJkZohj9sqn6H_LrfHMNG5cY794SWFJgA",
    libraries: ["places"],
  });
  loader
    .load()
    .then(() => {
      setLoadMap(true);
    })
    .catch((e) => {
      console.log("error loading Google Maps API");
    });

  const { wpExperience: experience } = data || {};
  const {
    title,
    uri,
    featuredImage,
    modified,
    commonDataAttributes,
    customDataAttributes,
  } = experience || {};

  const {
    imageGallery,
    sidebarTourOperator,
    sbtouroperatordescription,
    about,
    review,
    continent,
    country,
  } = commonDataAttributes || {};

  const {
    writer,
    whereToStay,
    recommendations,
    tourOperator,
    destinations,
    whenIsIt,
    region,
    ageBestSuitedFrom,
    whenToDoIt,
    gettingThere,
    priceFrom,
    minAge,
    affiliateTours,
    experiences,
    itineraries,
  } = customDataAttributes || {};

  const seoGeneral = useSeoGeneral();
  const seo = {
    page: experience?.seo,
    general: seoGeneral?.wp?.seo,
  };
  const seoImage = featuredImage?.node.localFile.childImageSharp.original;

  useRecentlyViewed({ title, featuredImage, uri });
  const url = window.location.href;

  const tabs = [
    { name: "our review" },
    { name: "logistics" },
    { name: "who to go with" },
    { name: "where to stay" },
    { name: "map" },
  ];
  const brContinent = continent?.length === 1 ? continent[0] : null;
const destinationsArray = useDdestinationsArray()

  const breadcrumbsTerms = [
    { name: "home", link: "/" },
    { name: brContinent, link: `/search/?q=${brContinent}` },
    { name: country.name, link: `/search/?q=${country.name}` },
    {
      name: region,
      link: destinationsArray.includes(region)
        ? `/destination/${region && slugs(region)}`
        : `/search/?q=${region}`,
    },
  ].filter((term) => term.name);

  const expReco =
    recommendations?.filter((item) => item.__typename === "WpExperience") || [];
  const ptsReco =
    recommendations?.filter((item) => item.__typename === "WpPlaceToStay") ||
    [];
  const recos = [...expReco, ...ptsReco];

  const bucketListExperiences = experiences?.filter(
    (exp) => exp.customDataAttributes.isBucketList === "yes"
  );
  const otherExperiences = experiences?.filter(
    (exp) => exp.customDataAttributes.isBucketList === "no"
  );

  return (
    <Layout page="experience">
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
      {loadMap && <ExperienceMap experience={experience} />}
      <PageLayout
        title={title}
        tabs={tabs}
        intro="Best things to do:"
        images={imageGallery}
        bl
        item={experience}
        sidebar={
          <div className="sticky top-0 z-50 space-y-base2 ">
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
        <CollapseSection title="Our review" id="our-review">
          <About
            writer={writer && writer[0]}
            date={modified}
            about={about}
            socialShare={<SocialShare url={url} />}
            review={review}
            text="Know someone who would like this experience? Why not let them know…"
          />
        </CollapseSection>
        {/* Recommendations = exp+ pts */}
        {recommendations && (
          <CollapseSection
            title="Recommendations"
            number={recommendations.length}
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={recos} pts />
              <CollapseCards cards={recos} className="md:hidden" />
            </div>
          </CollapseSection>
        )}
        <CollapseSection title="Logistics" id="logistics">
          <div
            className={clsx(
              "p-3 mb-12 bg-veryLightGold text-f-18",
              "grid lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-3"
            )}
          >
            <div>
              {" "}
              {priceFrom === null ? "Price: Free" : `Price from: ${priceFrom}`}
            </div>
            <div>Minimum Age: {minAge === null ? "Any" : minAge}</div>
            <div>Age suitable: {ageBestSuitedFrom}+</div>

            <div>When: {whenIsIt === null ? "All year around" : whenIsIt}</div>
          </div>
          <div className="space-y-base2">
            <TitleContent
              title="Getting there & doing it"
              content={gettingThere}
            />
            <TitleContent title="When to do it" content={whenToDoIt} />
          </div>
        </CollapseSection>

        {/* Affiliate tours */}
        {affiliateTours && (
          <CollapseSection
            title="Who to go with: organised tours"
            number={affiliateTours.length}
            id="who-to-go-with"
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={affiliateTours} noBl />
              <CollapseCards
                cards={affiliateTours}
                className="md:hidden"
                noBl
              />
            </div>
          </CollapseSection>
        )}

        {/* Tour operators */}
        {tourOperator && (
          <CollapseSection
            title="Who to go with: tour operators"
            number={tourOperator.length}
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={tourOperator} noBl />
              <CollapseCards cards={tourOperator} className="md:hidden" noBl />
            </div>
          </CollapseSection>
        )}
        {/* Where to stay */}
        {whereToStay && (
          <CollapseSection
            title="Where to stay"
            number={whereToStay.length}
            id="where-to-stay"
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={whereToStay} pts />
              <CollapseCards cards={whereToStay} className="md:hidden" pts />
            </div>
          </CollapseSection>
        )}
        {/* Itineraries */}
        {itineraries && (
          <CollapseSection
            title="Itineraries including this experience"
            number={itineraries.length}
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={itineraries} itinerary />
              <CollapseCards
                cards={itineraries}
                className="md:hidden"
                itinerary
              />
            </div>
          </CollapseSection>
        )}
        {/* Destinations guides */}
        {destinations && (
          <CollapseSection
            title="Destinations guides"
            number={destinations.length}
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={destinations} />
              <CollapseCards cards={destinations} className="md:hidden" />
            </div>
          </CollapseSection>
        )}
        {/* Bucketlist experiences */}
        {bucketListExperiences && bucketListExperiences?.length > 0 && (
          <CollapseSection
            title="Other bucket list experiences nearby"
            number={bucketListExperiences.length}
            listings
          >
            <div className="mt-5">
              <CollapseListings listings={bucketListExperiences} />
              <CollapseCards
                cards={bucketListExperiences}
                className="md:hidden"
              />
            </div>
          </CollapseSection>
        )}
        {/* Other experiences */}
        {otherExperiences && otherExperiences?.length > 0 &&  (
          <CollapseSection
            title="Other experiences nearby"
            number={otherExperiences.length}
            listings
          >
            <CollapseListings listings={otherExperiences} />
            <CollapseCards cards={otherExperiences} className="md:hidden" />
          </CollapseSection>
        )}
      </PageLayout>
      {/* Quote */}
      <TravelQuote author="Unknown">
        “Travel is the only thing you can buy that makes you richer”
      </TravelQuote>
    </Layout>
  );
};

export default ExperiencePage;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpExperience(uri: { eq: $uri }) {
      ...ExperiencePage
    }
  }
`;
