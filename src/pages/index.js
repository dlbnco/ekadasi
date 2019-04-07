import React from 'react';

import MoonInfo from '../components/Moon/Info';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Container from '../components/Container';

const IndexPage = () => {
  const date = new Date();
  return (
    <Layout>
      <SEO keywords={[`ekadasi`, `ekadashi`, `calendar`, `moon`, `fasting`]} />
      <Container maxWidth={640}>
        <MoonInfo date={date} />
      </Container>
    </Layout>
  );
};

export default IndexPage;
