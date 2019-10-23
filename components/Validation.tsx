import React, { FC, ReactNode } from 'react';

import { useMeQuery } from '../generated/graphql';
import Login from '../pages/user/login';

interface Props {
  children?: ReactNode;
}

const Validation: FC<Props> = ({ children }) => {
  const { loading, data } = useMeQuery();

  if (loading) return <p>Loading...</p>;
  if (!data!.me) return <Login />;

  return <>{children}</>;
};

export default Validation;
