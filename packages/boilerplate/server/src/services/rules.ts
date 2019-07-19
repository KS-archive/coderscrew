import { rule } from 'graphql-shield';

const isAuthenticatedUser = rule()((parent, args, context) => {
  return Boolean(context.request.userId);
});

const isPostOwner = rule()(async (parent, { id }, context) => {
  const userId = context.request.userId;
  const author = await context.prisma.post({ id }).author();
  return userId === author.id;
});

export default {
  isAuthenticatedUser,
  isPostOwner,
};
