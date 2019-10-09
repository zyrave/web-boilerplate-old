import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Nav from '../components/Nav';

const Content = styled.div`
  width: 100%;
  color: #333;
`;

const Title = styled.h1`
  margin: 0;
  width: 100%;
  padding-top: 80px;
  line-height: 1.15;
  font-size: 48px;
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
`;

const Row = styled.div`
  max-width: 880px;
  margin: 80px auto 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Card = styled.div`
  padding: 18px 18px 24px;
  width: 220px;
  text-align: left;
  color: #434343;
  border: 1px solid #9b9b9b;

  :hover {
    border-color: #067df7;
  }

  a {
    text-decoration: none;
  }

  h3 {
    margin: 0;
    color: #067df7;
    font-size: 18px;
  }

  p {
    margin: 0;
    padding: 12px 0 0;
    font-size: 13px;
    color: #333;
  }
`;

const Index: NextPage = () => (
  <Layout>
    <Head>
      <title>Home</title>
    </Head>

    <Nav />

    <Content>
      <Title>Welcome to Next.js!</Title>
      <Description>
        To get started, edit <code>pages/index.js</code> and save to reload.
      </Description>

      <Row>
        <Card>
          <a href="https://nextjs.org/docs">
            <h3>Documentation &rarr;</h3>
            <p>Learn more about Next.js in the documentation.</p>
          </a>
        </Card>
        <Card>
          <a href="https://nextjs.org/learn">
            <h3>Next.js Learn &rarr;</h3>
            <p>Learn about Next.js by following an interactive tutorial!</p>
          </a>
        </Card>
        <Card>
          <a href="https://github.com/zeit/next.js/tree/master/examples">
            <h3>Examples &rarr;</h3>
            <p>Find other example boilerplates on the Next.js GitHub.</p>
          </a>
        </Card>
      </Row>
    </Content>
  </Layout>
);

export default Index;
