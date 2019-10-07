import React from 'react';

import { useHelloQuery } from '../generated/graphql';
import Layout from '../components/Layout';

interface Props {}

const Hello: React.FC<Props> = () => {
  const { data } = useHelloQuery();

  return (
    <Layout title="Hello Page">
      <div>{data && data.hello ? data.hello : 'loading...'}</div>
    </Layout>
  );
};

export default Hello;
