import { prismaObjectType } from 'nexus-prisma';

// @ts-ignore
export default prismaObjectType({
  name: 'Post',
  definition(t) {
    t.prismaFields(['*']);
  },
});
