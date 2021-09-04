import { graphql } from "gatsby";
export const experienceFragments = graphql`
  fragment ExperienceListing on WpExperience {
    title
    uri
    slug
    id
    databaseId
    date
    modified
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
      country {
        name
        slug
      }
    }
    experienceTypes {
      nodes {
        slug
      }
    }
    customDataAttributes: experienceDataAttr {
      address
      city
      duration
      minAge
      isAffiliateTour
      isBucketList
      profile
      priceFrom
      region
      type
      website
      specificDate
      specificDay
      specificMonth
      specificTime
      whenIsIt
      bestMonthFrom1
      bestMonthFrom2
      ageBestSuitedFrom
      whenToDoIt
      gettingThere
      latitudeOfLocation1
      longitudeOfLocation1
      latitudeOfLocation2
      longitudeOfLocation2
      latitudeOfLocation3
      longitudeOfLocation3
    }
  }

  fragment ExperiencePage on WpExperience {
    title
    # viewCount
    uri
    slug
    id
    databaseId
    date
    modified
    experienceTypes {
      nodes {
        name
        slug
      }
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
    customDataAttributes: experienceDataAttr {
      activitySubType
      address
      ageBestSuitedFrom
      attractionSubType
      availableMonthFrom1
      availableMonthFrom2
      availableMonthTo1
      availableMonthTo2
      bestMonthFrom1
      bestMonthFrom2
      bestMonthTo1
      bestMonthTo2
      city
      duration
      eventSubType
      gettingThere
      isAffiliateTour
      isBucketList
      isGenericRecommendation
      latitudeOfLocation1
      latitudeOfLocation2
      latitudeOfLocation3
      longitudeOfLocation1
      longitudeOfLocation2
      longitudeOfLocation3
      minAge
      nearestAirport1
      nearestAirport2
      priceFrom
      profile
      recurringFrequency
      region
      setting
      specificDate
      specificDay
      specificMonth
      specificTime
      startTime
      suitableFor
      theme
      whenToDoIt
      affiliateTours {
        __typename
        ... on WpExperience {
          ...ExperienceListing
        }
      }
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
      itineraries {
        __typename
        ... on WpItinerary {
          ...ItineraryListing
        }
      }
      recommendations {
        __typename
        ... on WpExperience {
          ...ExperienceListing
        }
        ... on WpPlaceToStay {
          ...PlaceToStayListing
        }
      }
      whereToStay {
        __typename
        ... on WpPlaceToStay {
          ...PlaceToStayListing
        }
      }
      tourOperator {
        __typename
        ... on WpTourOperator {
          ...TourOperator
        }
      }
      tourSubType
      type
      website
      whenIsIt
      writer {
        ... on WpWriter {
          title
          id
          slug
          uri
        }
      }
    }
  }
`;
