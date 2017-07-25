import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { config } from '../../../../config';
import { UserModel } from '../shared';

const mutationName = 'logIn';

const mutation = `
${mutationName} (
  login: String!,
  password: String!,
  rememberMe: Boolean
): String
`;

async function logIn(_root, {login, password, rememberMe}) {
  return logInDb(
    login,
    password,
    rememberMe,
  );
}

async function logInDb(login: string, password: string, rememberMe: boolean) {
  const user = await UserModel.findOne({ login });

  if (!user || !compareSync(password, user.passwordHash)) {
    throw new Error(`Invalid username or password`);
  }

  const token = sign(
    {
      login,
      roles: user.roles,
    },
    config.jwtSecret,
    {
      expiresIn: rememberMe ? '1y' : '1m',
    },
  );

  return token;
}

const resolver = {};
resolver[mutationName] = logIn;

export default {
  mutation,
  resolver,
};

export {
  logIn,
  logInDb,
};
