import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export interface NextPageContextWithApolloClient extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export interface NextPageWithApolloClient<P = {}, IP = P> extends NextPage<P, IP> {
  getInitialProps?(ctx: NextPageContext & { apolloClient: ApolloClient<NormalizedCacheObject> }): Promise<IP>;
}
