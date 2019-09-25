import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
  // intercept request here
  // 1. call localstorage -> 2. get "jwt" here (redux)
  // for use data in localstorage
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  uri: "http://localhost:4000/graphql" // option: for connecting to graphql server
});

// apollo-boost is front-end like Redux
// substitude redux for apollo-boost
// apollo-boost connect GraphQL server to client

export default client;
