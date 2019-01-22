import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import App from "./App";
import { TOKEN } from "./constants";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const cache = new InMemoryCache({
  dataIdFromObject: o => `${o.__typename}-${o.id}`
});

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql/"
});

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
  link: authLink.concat(httpLink),
  cache: cache.restore(window.__APOLLO_STATE__ || {})
});

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
