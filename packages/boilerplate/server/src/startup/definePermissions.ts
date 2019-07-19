import { shield } from 'graphql-shield';
import deepmerge from 'deepmerge';

import postPermissions from 'modules/post/post.permissions';
import userPermissions from 'modules/user/user.permissions';

const definePermissions = () => shield(deepmerge(postPermissions, userPermissions) as any);

export default definePermissions;
