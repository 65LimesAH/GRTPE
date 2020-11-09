import { extendType, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcrypt';
import { generateAccessToken, handleError } from '../../utils/helpers';
import { errors } from '../../utils/constants';

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      async resolve(_parent, { email, password }, ctx) {
        let user = null;
        try {
          user = await ctx.prisma.user.findOne({
            where: {
              email,
            },
          });
        } catch (e) {
          handleError(errors.invalidUser);
        }

        if (!user) handleError(errors.invalidUser);

        const passwordValid = await compare(password, user.password);
        if (!passwordValid) handleError(errors.invalidUser);

        const accessToken = generateAccessToken(user.id);
        return {
          accessToken,
          user,
        };
      },
    });
  },
});
