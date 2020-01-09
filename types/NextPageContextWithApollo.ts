import { NextPageContext } from 'next';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export interface NextPageContextWithApollo extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  githubApolloClient: ApolloClient<NormalizedCacheObject>;
}
