import React from "react";
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
import { CollapseListings } from "../components/layout/CollapseListings";
import { IntroText } from "../components/layout/IntroText";
import { CollapseCards } from "../components/layout/CollapseCards";
import { useRecentlyViewed } from "../lib/hooks/useRecentlyViewed";
import clsx from "clsx";

const ItineraryPage = ({ data }) => {
  const url = window.location.href;
  const { wpItinerary: itinerary } = data || {};

  const {
    modified,
    uri,
    title,
    author,
    commonDataAttributes,
    customDataAttributes,
    featuredImage,
  } = itinerary || {};

  useRecentlyViewed({ title, featuredImage, uri });

  const { about, sidebarTourOperator, sbtouroperatordescription } =
    commonDataAttributes || {};
  const { days, longitudeOfLocation1, latitudeOfLocation1 } =
    customDataAttributes || {};
  return (
    <Layout page="itinerary">
      <PageLayout
        title={title}
        intro="Recommended itinerary:"
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
        <section
          className={clsx(
            "py-5 sm:py-8 my-3 sm:my-base2 px-4 sm:px-7",
            "bg-white border shadow-section border-grey2"
          )}
        >
          <About
            author={author.node}
            date={modified}
            socialShare={<SocialShare url={url} />}
            text="Know someone who would like this itinerary? Why not let them know…"
            about={about}
          />
        </section>
        {days?.map((day, index) => {
          const { about, links } = day;
          console.log("links", links);
          const expLinks = links.filter(
            (link) => link.__typename === "WpExperience"
          );
          const ptsLinks = links.filter(
            (link) => link.__typename === "WpPlaceToStay"
          );
          const allLinks = [...expLinks, ...ptsLinks];
          return (
            <CollapseSection
              key={index}
              title={`Day ${index + 1}${day.title ? ": " + day.title : ""}`}
              listings
            >
              <IntroText content={about} />
              <div>
                <CollapseListings listings={allLinks} pts />
                <CollapseCards cards={allLinks} className="md:hidden" pts />
              </div>
            </CollapseSection>
          );
        })}
      </PageLayout>
      {/* Quote */}
      <TravelQuote author="Mark Twain">
        “Twenty years from now you will be more disappointed by the things that
        you didn’t do than by the ones you did do. So throw off the bowlines.
        Sail away from the safe harbor. Catch the trade winds in your sails.
        Explore. Dream. Discover.”
      </TravelQuote>
    </Layout>
  );
};

export default ItineraryPage;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpItinerary(uri: { eq: $uri }) {
      ...ItineraryPage
    }
  }
`;
