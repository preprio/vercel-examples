// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.PREPR_ENDPOINT}`,
    cache: new InMemoryCache(),
});

export default client;