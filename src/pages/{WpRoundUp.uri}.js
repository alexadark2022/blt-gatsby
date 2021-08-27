import React from "react"
import { graphql } from "gatsby"

import { Container, Layout } from "../components"

const DestinationPage = ({ data }) => {
  console.log("data", data)
  return (
    <Layout page="destination">
      <Container>
        <h1>title</h1>
      </Container>
    </Layout>
  )
}

export default DestinationPage

export const pageQuery = graphql`
  query ($uri: String!) {
    wpRoundUp(uri: { eq: $uri }) {
      ...RoundUpPage
    }
  }
`
