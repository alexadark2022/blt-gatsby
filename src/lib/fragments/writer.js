import { graphql } from "gatsby"

export const writerFragments = graphql`
  fragment WriterListing on WpWriter {
    id
    title
    uri
    customDataAttributes: writerDataAttributes {
      summaryBio
    }
    featuredImage {
      node {
        ...ListingImage
      }
    }
  }

  fragment WriterPage on WpWriter {
    title
    id
    customDataAttributes: writerDataAttributes {
      about
      background
      specialistSubjects {
        subject
      }
      guideBooks {
        url
        title
      }
      awards {
        title
        url
      }
      onTheBucketList
      instagram
      location
      twitter
      website
      wikipedia
      facebook
      linkedin
    }
    featuredImage {
      node {
        ...ListingImage
      }
    }
  }
`
