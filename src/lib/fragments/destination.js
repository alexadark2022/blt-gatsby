import { graphql } from "gatsby"

export const destinationFragments = graphql`
  fragment DestinationListing on WpDestination {
    title
    uri
    slug
    id

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
      bestMonthTo1
      latitudeOfLocation1
      longitudeOfLocation1
    }
  }

  fragment DestinationPage on WpDestination {
    title
    viewCount
    uri
    slug
    id
    date
    modified
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
      bestMonthFrom2
      bestMonthTo1
      bestMonthTo2
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
        ... on WpWriter {
          title
          id
          slug
          uri
        }
      }
      experiences {
        ... on WpExperience {
          ...ExperienceListing
        }
      }
      affiliatedTours {
        ... on WpExperience {
          ...ExperienceListing
        }
      }
      destinationGuides: destination {
        ... on WpDestination {
          ...DestinationListing
        }
      }
      itineraries {
        ... on WpItinerary {
          ...ItineraryListing
        }
      }
      tourOperators {
        ... on WpTourOperator {
          ...TourOperator
        }
      }
      placesToStay {
        ... on WpPlaceToStay {
          ...PlaceToStayListing
        }
      }
    }
  }
`
