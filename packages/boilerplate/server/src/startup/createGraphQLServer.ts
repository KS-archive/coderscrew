import { GraphQLSchema } from 'graphql';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { IMiddlewareGenerator } from 'graphql-middleware';
import { prisma } from 'generated/prisma-client';

const pubsub = new PubSub();

const createGraphQLServer = (schema: GraphQLSchema, permissions: IMiddlewareGenerator<any, any, any>) => {
  return new GraphQLServer({
    schema,
    middlewares: [permissions],
    context: request => {
      return {
        ...request,
        prisma,
        pubsub,
      };
    },
  });
};

export default createGraphQLServer;
