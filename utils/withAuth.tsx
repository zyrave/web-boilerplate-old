import { NextPage } from 'next';
import React from 'react';

import { MeDocument, MeQuery } from '../generated/graphql';
import { NextPageContextWithApollo } from '../types/NextPageContextWithApollo';
import redirectTo from './redirectTo';

const withAuth = <T extends object>(WrappedComponent: NextPage<T>) => {
  const withAuthWrapper = (props: any) => <WrappedComponent {...props} />;

  withAuthWrapper.getInitialProps = async ({ apolloClient, ...ctx }: NextPageContextWithApollo) => {
    const response = await apolloClient.query<MeQuery>({
      query: MeDocument,
    });

    if (!response.data!.me) {
      redirectTo(ctx, '/');
      return {
        me: null,
      };
    }

    return {
      me: response.data!.me,
    };
  };

  return withAuthWrapper;
};

export default withAuth;
