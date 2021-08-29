import { graphql } from "gatsby";

export const commonFragments = graphql`
  fragment LargeImage on WpMediaItem {
    altText
    sourceUrl
    localFile {
      childImageSharp {
        gatsbyImageData(
          # width: 940
          # height: 626
          quality: 80
          aspectRatio: 1.5
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
    thumbLocalFile: localFile {
      childImageSharp {
        gatsbyImageData(width: 105, aspectRatio: 1.5, layout: CONSTRAINED)
        original {
          height
          width
          src
        }
      }
    }
  }

  fragment FullImage on WpMediaItem {
    altText
    sourceUrl
    localFile {
      childImageSharp {
        gatsbyImageData(quality: 80, layout: FULL_WIDTH)
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
`;
