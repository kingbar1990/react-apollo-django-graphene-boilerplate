import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import App from './containers/App';
import { loadData } from './utils';
import { TOKEN } from './constants';
import * as serviceWorker from './serviceWorker';


const cache = new InMemoryCache({
  dataIdFromObject: o => `${o.__typename}-${o.id}`,
});

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql/',
});

const authMiddleware = setContext(() => ({
  headers: {
    Authorization: `Bearer ${loadData(TOKEN)}`,
  },
}));

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: cache.restore(window.__APOLLO_STATE__ || {}),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
