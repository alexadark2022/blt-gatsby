import React from "react"
import { graphql } from "gatsby"

const DestinationPage = ({ data }) => {
  console.log("data", data)
  return <div></div>
}

export default DestinationPage

export const pageQuery = graphql`
  query ($uri: String!) {
    wpDestination(uri: { eq: $uri }) {
      # title
      # viewCount
      # uri
      # slug
      # id
      # date
      # modified
      # featuredImage {
      #   node {
      #     ...LargeImage
      #   }
      # }
      # tags {
      #   nodes {
      #     ...Tag
      #   }
      # }
      # categories {
      #   nodes {
      #     ...Category
      #   }
      # }
      ...DestinationPage
    }
  }
`
