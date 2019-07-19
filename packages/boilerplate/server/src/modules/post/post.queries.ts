import { stringArg, idArg } from 'nexus';
import { ObjectDefinitionBlock } from 'nexus/dist/core';

export default (t: ObjectDefinitionBlock<'Query'>) => {
  t.list.field('feed', {
    type: 'Post',
    resolve: (parent, args, ctx) => {
      return ctx.prisma.posts({
        where: { published: true },
      });
    },
  });

  t.list.field('filterPosts', {
    type: 'Post',
    args: {
      searchString: stringArg({ nullable: true }),
    },
    resolve: (parent, { searchString }, ctx) => {
      return ctx.prisma.posts({
        where: {
          OR: [{ title_contains: searchString }, { content_contains: searchString }],
        },
      });
    },
  });

  t.field('post', {
    type: 'Post',
    nullable: true,
    args: { id: idArg() },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.post({ id });
    },
  });

  t.list.field('posts', {
    type: 'Post',
    resolve: (parent, args, ctx) => {
      return ctx.prisma.posts();
    },
  });
};
