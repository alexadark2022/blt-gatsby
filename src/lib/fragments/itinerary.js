import { graphql } from "gatsby";

export const itineraryFragments = graphql`
  fragment ItineraryListing on WpItinerary {
    id
    slug
    title
    uri
    commonDataAttributes {
      standfirst
      country {
        name
        slug
      }
    }
    customDataAttributes: itineraryDataAttributes {
      longitudeOfLocation1
      latitudeOfLocation1
      duration
      minAge
      whenToDoIt
    }
    featuredImage {
      node {
        ...ListingImage
      }
    }
  }

  fragment ItineraryPage on WpItinerary {
    id
    # viewCount
    slug
    title
    uri
    seo {
      ...SeoPage
    }
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
      review {
        title
        content
      }
      standfirst
      sidebarTourOperator {
        ... on WpTourOperator {
          id
          title
          commonDataAttributes {
            standfirst
          }
          tourOperatorDataAttributes {
            phone
            website
          }
          featuredImage {
            node {
              ...ListingImage
            }
          }
        }
      }
      sbtouroperatordescription
    }
    customDataAttributes: itineraryDataAttributes {
      longitudeOfLocation1
      latitudeOfLocation1
      days {
        about
        title

        links {
          ... on WpExperience {
            __typename
            ...ExperienceListing
          }
          ... on WpPlaceToStay {
            __typename
            ...PlaceToStayListing
          }
        }
      }
    }
  }
`;
