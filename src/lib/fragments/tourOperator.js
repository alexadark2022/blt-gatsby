import { graphql } from "gatsby"

export const tourOperatorFragments = graphql`
  fragment TourOperator on WpTourOperator {
    title
    uri
    slug
    id
    featuredImage {
      node {
        ...ListingImage
      }
    }

    categories {
      nodes {
        ...Category
      }
    }
    commonDataAttributes {
      standfirst
      continent

      country {
        name
        slug
      }
    }
    customDataAttributes: tourOperatorDataAttributes {
      address
      city
      email
      phone
      region
      website
    }
  }
`
