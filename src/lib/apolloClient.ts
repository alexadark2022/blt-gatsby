import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import slashes from "remove-trailing-slash";

const link = createHttpLink({
  uri: `${slashes(process.env.GATSBY_WP_URL)}/graphql`,
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
