/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-non-null-assertion */
import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { apollo } from 'utils';

import Root from 'pages/Root';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get(
    '/*',
    async (req: express.Request, res: express.Response): Promise<void> => {
      try {
        const context: StaticRouterContext = {};
        const markup = await renderToStringWithData(
          <ApolloProvider client={apollo}>
            <StaticRouter context={context} location={req.url}>
              <Root />
            </StaticRouter>
          </ApolloProvider>,
        );
        const initialApolloState = apollo.extract();

        if (context.url) {
          res.redirect(context.url);
        } else {
          res.status(200).send(
            `<!doctype html>
            <html lang="">
            <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>Razzle TypeScript</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="stylesheet" href="https://use.typekit.net/gib2jyj.css">
              ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
              ${
                process.env.NODE_ENV === 'production'
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`
              }
            </head>
            <body>
              <div id="root">${markup}</div>
              <script>
                window.__APOLLO_STATE__ = ${JSON.stringify(initialApolloState).replace(/</g, '\\u003c')}
              </script>
            </body>
            </html>`,
          );
        }
      } catch (ex) {
        console.log(ex);
      }
    },
  );

export default server;
