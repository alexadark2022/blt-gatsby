import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

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
  console.log("data", data);
  console.log("writers");
  return <div></div>;
};

export default WritersPage;
