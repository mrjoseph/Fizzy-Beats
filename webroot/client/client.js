import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import ApolloClient from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { defaults } from './graphql/defaults/defaults';
import { resolvers } from './graphql/resolvers/resolvers';


const cache = new InMemoryCache();
// persistCache({
//   cache,
//   storage: window.localStorage,
// });


const stateLink = withClientState({
  defaults,
  resolvers, 
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
});

const link = ApolloLink.from([stateLink, uploadLink]);


export const client = new ApolloClient({
  link,
  cache,
});

