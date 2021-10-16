import { graphql } from "gatsby";

export const placeTostayFragments = graphql`
  fragment PlaceToStayListing on WpPlaceToStay {
    id
    title
    slug
    databaseId
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
    databaseId
    title
    uri
    # viewCount
    seo {
      ...SeoPage
    }
    featuredImage {
      node {
        ...ListingImage
      }
    }

    modified
    commonDataAttributes {
      about
      review {
        title
        content
      }
      standfirst
      continent
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
      region
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
        __typename
        ... on WpExperience {
          ...ExperienceListing
        }
      }
      destinations {
        __typename
        ... on WpDestination {
          ...DestinationListing
        }
      }
    }
  }
`;
