import { graphql } from "gatsby";
import SinglePost from "../components/Page";

export default SinglePost;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpPage(uri: { eq: $uri }) {
      title
      slug
      uri
      content
      isFrontPage
      aboutPageContent {
        ourDifference
        ourGoals
        ourStory
        ourWriters
        aboutImage {
          sourceUrl
        }
      }
      faq {
        faq {
          title
          content
        }
      }
      contactUs {
        contactIntro
      }
      homeHero {
        heroTitle
        topSentences {
          sentence
        }
        heroImage {
          ...FullImage
        }
      }
      whatWeOffer {
        wwoTextBelow
        wwoTitle
        wwoItems {
          content
        }
      }
      awards {
        items: awards {
          logo {
            id
            sourceUrl
            altText
          }
          url
        }
      }
    }
  }
`;
