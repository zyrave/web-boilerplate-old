import React from 'react';
import { NextPage } from 'next';

import { useMeQuery } from '../generated/graphql';
import Layout from '../components/Layout';

interface Props {}

const Index: NextPage<Props> = () => {
  const { loading, data } = useMeQuery();

  if (loading || !data) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>Email: {data.me ? data.me!.email : 'loading...'}</div>
    </Layout>
  );
};

export default Index;
