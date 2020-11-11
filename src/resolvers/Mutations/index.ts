import * as Posts from './Post';
import * as CreateUser from './CreateUser';
import * as LoginUser from './LoginUser';

export const Mutation = {
  ...Posts,
  ...CreateUser,
  ...LoginUser,
};
