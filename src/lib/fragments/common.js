import { graphql } from "gatsby"

export const commonFragments = graphql`
  fragment LargeImage on WpMediaItem {
    altText
    sourceUrl
    localFile {
      childImageSharp {
        gatsbyImageData(
          width: 940
          height: 682
          quality: 80
          layout: FULL_WIDTH
          transformOptions: { fit: COVER }
        )
        original {
          height
          width
          src
        }
      }
    }
  }

  fragment ListingImage on WpMediaItem {
    altText
    sourceUrl
    localFile {
      childImageSharp {
        gatsbyImageData(
          width: 249
          height: 166
          quality: 80
          layout: CONSTRAINED
        )
        original {
          height
          width
          src
        }
      }
    }
  }

  fragment ThumbImage on WpMediaItem {
    altText
    sourceUrl
    localFile {
      childImageSharp {
        gatsbyImageData(width: 98, height: 65, quality: 80, layout: CONSTRAINED)
        original {
          height
          width
          src
        }
      }
    }
  }

  fragment Tag on WpTag {
    id
    uri
    slug
    name
  }
  fragment Category on WpCategory {
    id
    uri
    slug
    name
  }
  fragment User on WpUser {
    id
    uri
    slug
    name
  }
`
