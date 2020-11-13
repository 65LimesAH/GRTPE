import { inputObjectType, mutationType, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const UserInputType = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
    t.string('firstName', { required: true });
    t.string('lastName', { required: true });
    t.string('nickName', { required: false });
    t.string('phone', { required: false });
  },
});

export const Mutation = mutationType({
  definition(t) {
    t.field('CreateUser', {
      type: 'AuthPayload',
      args: {
        user: 'UserCreateInput',
      },
      resolve: async (_parent, { user }, ctx) => {
        const { firstName, lastName, email, password } = user;
        const hashedPassword = await hash(password, 10);
        const created = await ctx.prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });
        return {
          token: sign({ userId: created.id }, process.env.APP_SECRET),
          user: created,
        };
      },
    });

    t.field('LoginUser', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        // const { pubsub } = ctx;
        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        // pubsub.publish(USER_SIGNED_IN, user);
        return {
          token: sign({ userId: user.id }, process.env.APP_SECRET),
          user,
        };
      },
    });
  },
});
