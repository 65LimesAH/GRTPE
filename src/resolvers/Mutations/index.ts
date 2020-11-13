import * as CreateUser from './CreateUser';
import * as LoginUser from './LoginUser';

export const Mutation = {
  ...CreateUser,
  ...LoginUser,
};
