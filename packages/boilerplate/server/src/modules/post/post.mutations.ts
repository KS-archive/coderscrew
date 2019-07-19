import { stringArg, idArg } from 'nexus';
import { ObjectDefinitionBlock } from 'nexus/dist/core';

export default (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('createDraft', {
    type: 'Post',
    args: {
      title: stringArg({ required: true }),
      content: stringArg({ nullable: true }),
    },
    resolve: async (parent, { title, content }, ctx) => {
      const post = await ctx.prisma.createPost({
        title,
        content,
        author: { connect: { id: ctx.request.userId } },
      });

      if (post) {
        ctx.pubsub.publish('POST_CHANGE_TOPIC', { post, event: 'draft' });
      }

      return post;
    },
  });

  t.field('deletePost', {
    type: 'Post',
    nullable: true,
    args: { id: idArg() },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.deletePost({ id });
    },
  });

  t.field('publish', {
    type: 'Post',
    nullable: true,
    args: { id: idArg() },
    resolve: (parent, { id }, ctx) => {
      return ctx.prisma.updatePost({
        where: { id },
        data: { published: true },
      });
    },
  });
};
