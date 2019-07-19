process.env.NODE_PATH = __dirname;
// tslint:disable-next-line:no-var-requires
require('module').Module._initPaths();

import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '..', '.env') });
import './types';
require('services/passport');

import {
  definePermissions,
  createPrismaSchema,
  createGraphQLServer,
  runExpressMiddleware,
  createExpressRoutes,
} from 'startup';

const server = createGraphQLServer(createPrismaSchema(), definePermissions());
runExpressMiddleware(server);
createExpressRoutes(server);

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL,
    },
  },
  () => console.log(`🚀 Server ready at http://localhost:4000`),
);
