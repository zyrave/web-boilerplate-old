import { useEffect } from 'react';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { useLogoutMutation } from '../../generated/graphql';
import { NextPageWithApolloClient, NextPageContextWithApolloClient } from '../../interfaces';
import redirect from '../../lib/redirect';

interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const getInitialProps = async ({ apolloClient }: NextPageContextWithApolloClient) => ({ apolloClient });

const Logout: NextPageWithApolloClient<Props> = ({ apolloClient, ...ctx }) => {
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const runEffect = async () => {
      try {
        await logout();
        await apolloClient.resetStore();
        redirect(ctx, '/user/login');
      } catch (err) {
        console.log(err);
        return;
      }
    };

    runEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

Logout.getInitialProps = getInitialProps;

export default Logout;
