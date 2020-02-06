import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { I18nextProvider } from "react-i18next";

import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

// import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import App from "./App";
import { TOKEN } from "./constants";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import i18n from "./i18n";

const cache = new InMemoryCache({
  dataIdFromObject: o => `${o.__typename}-${o.id}`
});

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:8000/graphql/"
});

const wsLink = new WebSocketLink({
  uri: `ws://127.0.0.1:8000/graphql/`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  let data = "";
  try {
    const token = localStorage.getItem(TOKEN);
    data = token ? JSON.parse(token).token : "";
  } catch (error) {}
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${data}`
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: cache.restore(window.__APOLLO_STATE__ || {})
});
console.log(client);
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
