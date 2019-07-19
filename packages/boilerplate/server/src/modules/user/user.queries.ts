import { ObjectDefinitionBlock } from 'nexus/dist/core';

export default (t: ObjectDefinitionBlock<'Query'>) => {
  t.field('me', {
    type: 'User',
    resolve: (parent, args, ctx) => {
      return ctx.prisma.user({ id: ctx.request.userId });
    },
  });
};
