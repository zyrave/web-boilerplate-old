import React from 'react';

import { useMeQuery } from '../generated/graphql';

const Index = () => {
  const { loading, data } = useMeQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return <div>{data.me!.email}</div>;
};

export default Index;
