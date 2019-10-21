import React from 'react';
import { NextPage } from 'next';

import { useHelloQuery } from '../generated/graphql';
import { Layout } from '../components';

const Hello: NextPage = () => {
  const { data } = useHelloQuery();

  return (
    <Layout title="Hello Page">
      <div>{data && data.hello ? data.hello : 'loading...'}</div>
    </Layout>
  );
};

export default Hello;
