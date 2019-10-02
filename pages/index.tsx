import React from 'react';

import { useMeQuery } from '../generated/graphql';

interface Props {}

const Index: React.FC<Props> = () => {
  const { loading, data } = useMeQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return <div>{data.me!.email}</div>;
};

export default Index;
