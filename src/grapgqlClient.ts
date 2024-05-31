import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const userStr = localStorage.getItem("user"); // get stored user
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: userStr
        ? `Bearer ${JSON.parse(userStr)?.token || ""}`
        : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
