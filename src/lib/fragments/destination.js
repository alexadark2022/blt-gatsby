import { graphql } from "gatsby";

export const destinationFragments = graphql`
  fragment DestinationListing on WpDestination {
    title
    uri
    slug
    id
    databaseId

    featuredImage {
      node {
        ...ListingImage
      }
    }
    tags {
      nodes {
        ...Tag
      }
    }
    categories {
      nodes {
        ...Category
      }
    }
    commonDataAttributes {
      standfirst
      country {
        name
        slug
      }
    }

    customDataAttributes: destinationDataAttributes {
      region
      profile
      bestMonthFrom1
      latitudeOfLocation1
      longitudeOfLocation1
    }
  }

  fragment DestinationPage on WpDestination {
    title
    # viewCount
    uri
    slug
    id
    databaseId
    date
    modified
    seo {
      ...SeoPage
    }
    featuredImage {
      node {
        ...ListingImage
      }
    }
    tags {
      nodes {
        ...Tag
      }
    }
    categories {
      nodes {
        ...Category
      }
    }
    commonDataAttributes {
      about
      standfirst
      continent
      review {
        title
        content
      }
      country {
        name
        slug
      }
      imageGallery {
        ...LargeImage
        ...ThumbImage
      }
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

    customDataAttributes: destinationDataAttributes {
      bestMonthFrom1
      latitudeOfLocation1
      longitudeOfLocation1
      culture
      foodDrink
      gettingAround
      gettingThere
      healthSafety
      nearestAirport1
      nearestAirport2
      nearestAirport3
      orientation
      profile
      region
      setting
      whenToGo
      whereToEat
      whereToShop
      whereToStay
      additionalSections {
        title
        content
      }
      writer {
        __typename
        ... on WpWriter {
          title
          id
          slug
          uri
        }
      }
      experiences {
        __typename
        ... on WpExperience {
          ...ExperienceListing
        }
      }
      affiliatedTours {
        __typename
        ... on WpExperience {
          ...ExperienceListing
        }
      }
      destinationGuides: destination {
        __typename
        ... on WpDestination {
          ...DestinationListing
        }
      }
      itineraries {
        __typename
        ... on WpItinerary {
          ...ItineraryListing
        }
      }
      tourOperators {
        __typename
        ... on WpTourOperator {
          ...TourOperator
        }
      }
      placesToStay {
        __typename
        ... on WpPlaceToStay {
          ...PlaceToStayListing
        }
      }
    }
  }
`;
