import React from "react"

import MoonInfo from "../components/Moon/Info"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/Container"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`ekadasi`, `fasting`]} />
    <Container maxWidth={640}>
      <MoonInfo />
    </Container>
  </Layout>
)

export default IndexPage
