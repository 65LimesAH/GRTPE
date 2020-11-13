// import { mutationType,extendInputType stringArg } from '@nexus/schema';
// import { compare } from 'bcrypt';
// import { sign } from 'jsonwebtoken';

// export const LoginUser = extendInputType({
//   definition(t) {
//     t.field('LoginUser', {
//       type: 'AuthPayload',
//       args: {
//         email: stringArg({ nullable: false }),
//         password: stringArg({ nullable: false }),
//       },
//       resolve: async (_parent, { email, password }, ctx) => {
//         // const { pubsub } = ctx;
//         const user = await ctx.prisma.user.findOne({
//           where: {
//             email,
//           },
//         });
//         if (!user) {
//           throw new Error(`No user found for email: ${email}`);
//         }
//         const passwordValid = await compare(password, user.password);
//         if (!passwordValid) {
//           throw new Error('Invalid password');
//         }
//         // pubsub.publish(USER_SIGNED_IN, user);
//         return {
//           token: sign({ userId: user.id }, process.env.APP_SECRET),
//           user,
//         };
//       },
//     });
//   },
// });
