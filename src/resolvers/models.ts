import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.createdAt();
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.email();
    t.model.password();
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});
