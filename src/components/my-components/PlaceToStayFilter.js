import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function PlaceToStayFilter() {
  const PTSFilters = useStaticQuery(graphql`
    query PTS_FILTERS_QUERY {
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
      allWpStandard {
        nodes {
          name
          slug
        }
      }
      allWpAccommodationType {
        nodes {
          name
          slug
        }
      }
      allWpRoomType {
        nodes {
          name
          slug
        }
      }
      allWpHotelFacility {
        nodes {
          name
          slug
        }
      }
      allWpHotelBrand {
        nodes {
          name
          slug
        }
      }
    }
  `);
  console.log(PTSFilters);
  return (
    <div>
      <p>Hello</p>
    </div>
  );
}
