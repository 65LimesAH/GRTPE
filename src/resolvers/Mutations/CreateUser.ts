import { extendType, stringArg } from '@nexus/schema';
import { hash } from 'bcrypt';
import { generateAccessToken, handleError } from '../../utils/helpers';
import { errors } from '../../utils/constant';

export const createUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      async resolve(_parent, { name, email, password }, ctx) {
        try {
          const hashedPassword = await hash(password, 10);
          console.log(hashedPassword, ctx);
          const user = await ctx.prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
            },
          });
          const accessToken = generateAccessToken(user.id);
          console.log(accessToken);
          return {
            accessToken,
            user,
          };
        } catch (e) {
          handleError(errors.userAlreadyExists);
        }
      },
    });
  },
});
