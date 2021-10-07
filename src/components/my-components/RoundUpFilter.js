import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function RoundUpFilter() {
  const commonFilters = useStaticQuery(graphql`
    query COMMON_FILTERS_QUERY {
      allWpContinent {
        nodes {
          name
          slug
        }
      }
      allWpSetting {
        nodes {
          name
          slug
        }
      }
      allWpFactoryTheme {
        nodes {
          name
          slug
        }
      }
      allWpBestTime {
        nodes {
          name
          slug
        }
      }
      allWpEspeciallyFor {
        nodes {
          name
          slug
        }
      }
    }
  `);
  console.log(commonFilters);
  return (
    <div>
      <p>Hello</p>
    </div>
  );
}
