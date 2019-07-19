import { mutationType, extendType, queryType } from 'nexus';
import { readdirSync, lstatSync } from 'fs';
import { resolve } from 'path';

const createResolvers = () => {
  const resolvers: any = {};

  const modules = readdirSync(resolve('src', 'modules'));

  for (const module of modules) {
    const filePath = resolve('src', 'modules', module);
    if (lstatSync(filePath).isDirectory()) {
      const moduleFileNames = readdirSync(filePath);

      for (const fileName of moduleFileNames) {
        const typeName = fileName.match(new RegExp('.([a-z]*).ts$'))![1];

        if (['mutations', 'queries', 'subscriptions', 'type'].includes(typeName)) {
          const func = require(resolve('src', 'modules', module, fileName)).default;
          if (Array.isArray(resolvers[typeName])) {
            resolvers[typeName].push(func);
          } else {
            resolvers[typeName] = [func];
          }
        }
      }
    }
  }

  const Mutation = mutationType({
    definition(t) {
      for (const mutation of resolvers.mutations) {
        mutation(t);
      }
    },
  });

  const Query = queryType({
    definition(t) {
      for (const query of resolvers.queries) {
        query(t);
      }
    },
  });

  const Subscription = extendType({
    type: 'Subscription',
    definition(t) {
      for (const subscription of resolvers.subscriptions) {
        subscription(t);
      }
    },
  });

  const types: { [k: string]: any } = {};
  for (const prismaType of resolvers.type) {
    types[prismaType.name] = prismaType;
  }

  return {
    ...types,
    Query,
    Mutation,
    Subscription,
  };
};

export default createResolvers;
