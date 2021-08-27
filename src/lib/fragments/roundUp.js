import { graphql } from "gatsby"

export const roundUpFragments = graphql`
  fragment RoundUpPage on WpRoundUp {
    id
    # viewCount
    slug
    title
    modified
    uri
    featuredImage {
      node {
        ...ListingImage
      }
    }
    author {
      node {
        name
        slug
      }
    }
    commonDataAttributes {
      about
      standfirst
    }
    customDataAttributes: roundUpDataAttributes {
      type

      links {
        title
        intro
        externalLink
        link {
          __typename
          ... on WpDestination {
            ...DestinationListing
          }
          ... on WpPlaceToStay {
            ...PlaceToStayListing
          }
          ... on WpExperience {
            ...ExperienceListing
          }
        }
      }
    }
  }
`
