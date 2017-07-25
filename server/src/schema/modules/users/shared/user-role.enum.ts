import { UserRole } from '../../../../../../common/users';

let userRoleEnum = `
# User roles
enum USER_ROLE {
`;

Object.keys(UserRole)
  .filter((k) => isNaN(+k))
  .forEach((role) => {
    userRoleEnum += `${role}
    `;
  });

userRoleEnum += `}`;

export { userRoleEnum };
