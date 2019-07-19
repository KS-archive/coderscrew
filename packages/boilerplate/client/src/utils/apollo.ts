import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import 'isomorphic-fetch';

const isBrowser = typeof window !== 'undefined';

declare global {
  interface Window {
    __APOLLO_STATE__: any;
  }
}

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'include',
});

const wsLink = isBrowser
  ? new WebSocketLink({
      uri: `ws://localhost:4000/`,
      options: {
        reconnect: true,
      },
    })
  : null;

const link = isBrowser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink!,
      httpLink,
    )
  : httpLink;

const client = new ApolloClient({
  connectToDevTools: isBrowser,
  ssrMode: !isBrowser,
  ssrForceFetchDelay: 100,
  link,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-and-network' as any, // FIXME: "cache-and-network" isn't currently included in fetchPolicy type.
    },
  },
  cache: isBrowser ? new InMemoryCache().restore(window.__APOLLO_STATE__) : new InMemoryCache(),
});

export default client;
