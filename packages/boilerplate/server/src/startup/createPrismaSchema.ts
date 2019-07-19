import { resolve } from 'path';
import { prisma } from 'generated/prisma-client';
import { makePrismaSchema } from 'nexus-prisma';
import createResolvers from './createResolvers';
import datamodelInfo from 'generated/nexus-prisma';

const createPrismaSchema = () => {
  const resolvers = createResolvers();

  return makePrismaSchema({
    types: { resolvers },
    prisma: {
      datamodelInfo,
      client: prisma,
    },
    outputs: {
      schema: resolve(__dirname, '..', 'generated', 'schema.graphql'),
      typegen: resolve(__dirname, '..', 'generated', 'nexus.ts'),
    },
    nonNullDefaults: {
      input: false,
      output: false,
    },
    typegenAutoConfig: {
      sources: [
        {
          source: resolve(__dirname, '..', 'types.ts'),
          alias: 'types',
        },
      ],
      contextType: 'types.Context',
    },
  });
};

export default createPrismaSchema;
