import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Layout, Section } from "../components";
import { Newsletter } from "../components/Newsletter";
import clsx from "clsx";
import { Listing } from "../components/layout/Listing";
import { ListingCard } from "../components/layout/ListingCard";
import PageLayout from "../components/layout/PageLayout";

const GET_ALL_WRITERS = graphql`
  query MyQuery {
    allWpWriter(sort: { fields: title, order: ASC }, limit: 100) {
      nodes {
        ...WriterListing
      }
    }
  }
`;

const WritersPage = () => {
  const data = useStaticQuery(GET_ALL_WRITERS);
  let writers = data?.allWpWriter?.nodes;

  return (
    <Layout>
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
            );
          })}
        </Section>
      </PageLayout>
    </Layout>
  );
};

export default WritersPage;
