import { hashSync } from 'bcryptjs';

import { UserModel } from '../shared';
import { IBaseUserWithPassword, IBaseUserWithPasswordHash } from '../shared/user.interface';
import { permissionService, IUser } from '../../shared';

const mutationName = 'addUser';

const mutation = `
${mutationName} (
  login: String!,
  password: String!,
  roles: [USER_ROLE]!
): User
`;

async function addUser(_root, {login, password, roles}, {user}) {
  return addUserDb({
    login,
    password,
    roles,
  }, user);
}

async function addUserDb(userToCreate: IBaseUserWithPassword, authenticatedUser: IUser) {
  if (!permissionService.hasAdminRole(authenticatedUser)) {
    throw new Error(`You are not authorized to perform this action`);
  }

  const existingUser = await UserModel.findOne({
    login: userToCreate.login,
  });

  if (existingUser) {
    throw new Error(`User with login ${userToCreate.login} already exists`);
  }

  const userToSave: IBaseUserWithPasswordHash = {
    login: userToCreate.login,
    passwordHash: hashSync(userToCreate.password),
    roles: userToCreate.roles,
  };

  const user = await UserModel.create(userToSave);

  return user.toObject();
}

const resolver = {};
resolver[mutationName] = addUser;

export default {
  mutation,
  resolver,
};

export {
  addUser,
  addUserDb,
};
