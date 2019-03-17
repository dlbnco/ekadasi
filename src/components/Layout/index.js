import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import 'minireset.css';
import { Flex, Box } from 'rebass';
import githubIcon from './github.svg';

import Header from '../header';
import { defaultTheme, backgroundColor } from '../../theme';
import GlobalStyle from '../GlobalStyle';

const Wrapper = styled(Flex).attrs({ flexDirection: 'column' })`
  background: ${backgroundColor};
  min-height: 100vh;
`;

const Footer = styled(Flex).attrs({ justifyContent: 'center', p: 3 })``;

Wrapper.defaultProps = {
  variant: 'primary',
};

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
            <Box flex="1">
              <Header siteTitle={data.site.siteMetadata.title} />
              <main>{children}</main>
            </Box>
            <Footer width={1}>
              <a
                href="https://github.com/dlbnco/ekadasi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={githubIcon} style={{ height: 24 }} />
              </a>
            </Footer>
          </Wrapper>
        )}
      />
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
