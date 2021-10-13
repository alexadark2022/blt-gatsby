import { graphql } from "gatsby";

const EXPERIENCE_FILTERS_QUERY = graphql`
  query EXPERIENCE_FILTERS_QUERY {
    allWpWhenAvailable {
      nodes {
        name
        slug
      }
    }
    allWpExperience {
      nodes {
        slug
        title
      }
    }
    allWpAgeGroup {
      nodes {
        name
        slug
      }
    }
    allWpAttractionType {
      nodes {
        name
        slug
      }
    }
    allWpActivityType {
      nodes {
        name
        slug
      }
    }
    allWpEventType {
      nodes {
        name
        slug
      }
    }
    allWpPriceRange {
      nodes {
        name
        slug
      }
    }
  }
`;

export default EXPERIENCE_FILTERS_QUERY;
