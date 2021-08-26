import { graphql } from "gatsby"

export const placeTostayFragments = graphql`
  fragment PlaceToStayListing on WpPlaceToStay {
    id
    title
    slug
    uri
    categories {
      nodes {
        ...Category
      }
    }
    tags {
      nodes {
        ...Tag
      }
    }
    commonDataAttributes {
      standfirst
      country {
        name
        slug
      }
    }
    customDataAttributes: ptsDataAttr {
      website
      starRating
      region
      city
      latitudeOfLocation1
      longitudeOfLocation1
      priceCheckingLinks {
        url
        logo {
          altText
          sourceUrl
        }
      }
    }
    featuredImage {
      node {
        ...ListingImage
      }
    }
  }

  fragment PlaceToStayPage on WpPlaceToStay {
    id
    viewCount
    title
    uri
    viewCount
    featuredImage {
      node {
        ...ListingImage
      }
    }

    modified
    commonDataAttributes {
      about
      standfirst
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
    customDataAttributes: ptsDataAttr {
      writer {
        ... on WpWriter {
          title
          id
          slug
          uri
        }
      }
      address
      airportTransfers
      allInclusive
      fdFeatures
      otherHotelFacilities
      parking
      pool
      beach
      priceCheckingLinks {
        url
        logo {
          altText
          sourceUrl
        }
      }
      roomFeatures
      roomForFamilies
      roomType
      selfCatering
      isSkiHotel
      ski
      starRating
      wifi
      latitudeOfLocation1
      longitudeOfLocation1
      experiences {
        ... on WpExperience {
          ...ExperienceListing
        }
      }
      destinations {
        ... on WpDestination {
          ...DestinationListing
        }
      }
    }
  }
`
