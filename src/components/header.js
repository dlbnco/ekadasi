import PropTypes from "prop-types"
import React from "react"
import Container from "./Container"
import Heading from "./Heading"

const Header = ({ siteTitle }) => (
  <Container py={[3, 4]}>
    <Heading textAlign="center" fontSize={[5, 6]} fontWeight="bold">
      {siteTitle}
      <br /> –
    </Heading>
  </Container>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
