import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.password();
    t.model.firstName();
    t.model.lastName();
    t.model.phone();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.model.authType();
    t.model.verified();
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken');
    t.field('user', { type: 'User' });
  },
});
