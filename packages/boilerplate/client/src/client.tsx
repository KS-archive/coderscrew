import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { apollo } from 'utils';

import Root from 'pages/Root';

// @ts-ignore
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <ApolloProvider client={apollo}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
