import { graphql } from "gatsby";

const COMMON_FILTERS_QUERY = () => graphql`
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
`;
export default COMMON_FILTERS_QUERY;
