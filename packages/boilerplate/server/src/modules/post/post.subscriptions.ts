import { OutputDefinitionBlock, SubscribeFieldConfig } from 'nexus/dist/core';
import { Post } from 'generated/prisma-client';
import mapAsyncIterator from 'utils/mapAsyncIterator';

type PostTopicEvent = 'draft' | 'publish' | 'delete';

const postsSubscription: SubscribeFieldConfig<'Subscription', 'posts'> = {
  type: 'Post',
  subscribe(root, args, ctx) {
    return mapAsyncIterator<{ post: Post; event: PostTopicEvent }, Post>(
      ctx.pubsub.asyncIterator('POST_CHANGE_TOPIC'),
      value => {
        console.log('Event reason: ', value.event);
        return value.post;
      },
    );
  },
  resolve(payload) {
    return payload;
  },
};

export default (t: OutputDefinitionBlock<'Subscription'>) => {
  t.field('posts', postsSubscription);
};
