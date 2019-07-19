import { rules } from 'services';

export default {
  Query: {
    me: rules.isAuthenticatedUser,
  },
};
