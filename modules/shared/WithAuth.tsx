import { NextPage } from 'next';
import React from 'react';

import redirect from '../../utils/redirect';
import { MeDocument, MeQuery } from '../../generated/graphql';
import { NextPageContextWithApollo } from '../../types/NextPageContextWithApollo';

const WithAuth = <T extends object>(WrappedComponent: NextPage<T>) => {
  const WithAuthWrapper = (props: any) => <WrappedComponent {...props} />;

  WithAuthWrapper.getInitialProps = async ({ apolloClient, ...ctx }: NextPageContextWithApollo) => {
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

  return WithAuthWrapper;
};

export default WithAuth;
