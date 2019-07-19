import { prismaObjectType } from 'nexus-prisma';

export default prismaObjectType({
  name: 'User',
  definition(t) {
    t.prismaFields([
      'id',
      'name',
      'email',
      {
        name: 'posts',
        args: [],
      },
    ]);
  },
});
