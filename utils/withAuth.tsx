import { NextPage } from 'next';
import React from 'react';

import redirect from './redirect';
import { MeDocument, MeQuery } from '../generated/graphql';
import { NextPageContextWithApollo } from '../types/NextPageContextWithApollo';

const withAuth = <T extends object>(WrappedComponent: NextPage<T>) => {
  const withAuthWrapper = (props: any) => <WrappedComponent {...props} />;

  withAuthWrapper.getInitialProps = async ({ apolloClient, ...ctx }: NextPageContextWithApollo) => {
    const response = await apolloClient.query<MeQuery>({
      query: MeDocument,
    });

    if (!response.data!.me) {
      redirect(ctx, '/');
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
