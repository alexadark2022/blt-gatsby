import * as React from "react";
import "./src/styles/tailwind.css";
import { AuthProvider } from "./src/lib/hooks/useAuth";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/lib/apolloClient";

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <AuthProvider>{element}</AuthProvider>
  </ApolloProvider>
);
