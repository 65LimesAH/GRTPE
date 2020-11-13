import { AuthenticationError, UserInputError } from 'apollo-server';

export const errors = {
  notAuthenticated: new AuthenticationError('Unauthenticated user!'),
  userAlreadyExists: new UserInputError('User already exists!'),
  invalidUser: new UserInputError('Invalid username or password'),
};

// export const handleError = (error: any) => {
//   // add any other logging mechanism here e.g. Sentry
//   throw error;
// };
