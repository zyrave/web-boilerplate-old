import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
  {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

const Index = () => {
  const { loading, data } = useQuery(QUERY);

  if (loading || !data) {
    return <p>loading...</p>;
  }

  return <p>{JSON.stringify(data)}</p>;
};

export default Index;
