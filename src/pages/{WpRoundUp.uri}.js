import React, { useState, useEffect } from "react";
import { Layout, Section, SocialShare, TravelQuote } from "../components";
import PageLayout from "../components/layout/PageLayout";
import clsx from "clsx";
import { window } from "browser-monads";
import { About } from "../components/layout/About";
import { CardsGrid } from "../components/layout/CardsGrid";
import { Listing } from "../components/layout/Listing";
import { ListingCard } from "../components/layout/ListingCard";
import { ViewSwitcher } from "../components/ui-components/ViewSwitcher";
import { graphql } from "gatsby";
import { Breadcrumbs } from "../components/Breadcrumbs";
import PlaceToStayFilter from "../components/my-components/PlaceToStayFilter";
import useStore from "./../store";
const RoundupPage = ({ data }) => {
  console.log("data", data);
  const { wpRoundUp: roundUp } = data || {};
  const contentType = roundUp.customDataAttributes.type;
  const [view, setView] = useState("list");

  useEffect(() => {
    const isLarge = window.matchMedia("(min-width: 768px)").matches;
    isLarge ? setView("list") : setView("grid");
  }, []);

  const url = window.location.href;

  const {
    title,
    commonDataAttributes,
    customDataAttributes,
    modified,
    author,
  } = roundUp || {};

  const { about } = commonDataAttributes || {};
  const { links } = customDataAttributes || {};
  const breadcrumbsTerms = [{ name: "home", link: "/" }, { name: "Round-ups" }];
  const [openFilters, setOpenFilters] = useState(false);
  const [filteredLinks, setFilteredLinks] = useState(links);

  const updateItemExist = useStore((state) => state.updateItemExist);
  // {
  //   continent,
  //   setting,
  //   theme,
  //   bestTime,
  //   espFor,
  //   recType,
  // }
  const {
    continentFilter,
    settingFilter,
    themeFilter,
    bestTimeFilter,
    espForFilter,
    recTypeFilter,
  } = useStore((state) => state.allFilters);
  useEffect(() => {
    let resArr = links;
    if (settingFilter.length) {
      resArr = resArr.filter((item) => {
        const settings = item.link[0].customDataAttributes.setting;
        const haveSettings = settings.some((item) =>
          settingFilter.length ? settingFilter?.includes(item) ?? true : true
        );
        if (haveSettings) {
          return true;
        }
      });
    }
    if (continentFilter.length) {
      resArr = resArr.filter((item) => {
        const continents = item.link[0].commonDataAttributes.continent;
        const haveContinents = continents.some((item) =>
          continentFilter.length
            ? continentFilter?.includes(item) ?? true
            : true
        );
        if (haveContinents) {
          return true;
        }
      });
    }
    if (themeFilter.length) {
      resArr = resArr.filter((item) => {
        const themes = item.link[0].customDataAttributes.theme;
        const haveTheme = themes.some((item) =>
          themeFilter.length ? themeFilter?.includes(item) ?? true : true
        );
        if (haveTheme) {
          return true;
        }
      });
    }
    if (espForFilter.length) {
      resArr = resArr.filter((item) => {
        const espFors = item.link[0].customDataAttributes.especiallyFor;
        const haveEspFor =
          espFors?.some((item) =>
            espForFilter.length ? espForFilter?.includes(item) ?? true : true
          ) ?? false;
        if (haveEspFor) {
          return true;
        }
      });
    }
    setFilteredLinks([...new Set(resArr)]);
  }, [
    continentFilter,
    settingFilter,
    themeFilter,
    bestTimeFilter,
    espForFilter,
    recTypeFilter,
  ]);

  useEffect(() => {
    updateItemExist({
      continent: [
        ...new Set(
          links.map(({ link }) => link[0].commonDataAttributes.continent).flat()
        ),
      ],
      setting: [
        ...new Set(
          links.map(({ link }) => link[0].customDataAttributes.setting).flat()
        ),
      ],
      theme: [
        ...new Set(
          links.map(({ link }) => link[0].customDataAttributes.theme).flat()
        ),
      ],
      espFor: [
        ...new Set(
          links
            .map(({ link }) => link[0].customDataAttributes.especiallyFor)
            .flat()
        ),
      ],
    });
  }, []);
  console.log(filteredLinks);
  return (
    <Layout page="round-up">
      <Breadcrumbs terms={breadcrumbsTerms} />

      <PageLayout
        title={title}
        smallMargin
        intro="Our round-ups of the best of the best: "
        isFilters
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        sidebar={
          contentType === "Places to stay" && (
            <PlaceToStayFilter
              openFilters={openFilters}
              setOpenFilters={setOpenFilters}
            />
          )
        }
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
            {filteredLinks?.map((item, i) => {
              const type = item.link[0].__typename;

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
              );
            })}
          </Section>
        )}
        {view === "grid" && (
          <CardsGrid cards={filteredLinks} className="mb-base2" />
        )}
        {view === "map" && "map view here"}
      </PageLayout>
      {/* Quote */}
      <TravelQuote author="Daranna Gidel">
        “You lose sight of things… and when you travel, everything balances
        out.”
      </TravelQuote>
    </Layout>
  );
};
export default RoundupPage;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpRoundUp(uri: { eq: $uri }) {
      ...RoundUpPage
    }
  }
`;
