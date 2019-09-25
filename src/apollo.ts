import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql" // option: for connecting to graphql server
});

// apollo-boost is front-end like Redux
// substitude redux for apollo-boost
// apollo-boost connect GraphQL server to client

export default client;
