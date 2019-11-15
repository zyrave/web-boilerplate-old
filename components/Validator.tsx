import React, { FC, ReactNode } from 'react';

import { useMeQuery } from '../generated/graphql';
import Login from '../pages/users/login';

interface Props {
  children?: ReactNode;
}

const Validator: FC<Props> = ({ children }) => {
  const { loading, data } = useMeQuery();

  if (loading) return <p>Loading...</p>;
  if (!data!.me) return <Login />;

  return <>{children}</>;
};

export default Validator;
