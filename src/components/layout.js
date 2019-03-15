import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import "minireset.css"

import Header from "./header"
import { defaultTheme, backgroundColor } from "../theme"
import GlobalStyle from "./GlobalStyle"

const Wrapper = styled.div`
  background: ${backgroundColor};
  min-height: 100vh;
`

Wrapper.defaultProps = {
  variant: "primary",
}

const Layout = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <GlobalStyle />
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Wrapper>
            <Header siteTitle={data.site.siteMetadata.title} />
            <main>{children}</main>
          </Wrapper>
        )}
      />
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
