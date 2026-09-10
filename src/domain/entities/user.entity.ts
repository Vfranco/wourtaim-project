import {UserRolesOptions} from "../enums/user-roles.enum";

export interface User {
  id: string;
  personId: number;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRolesOptions;
}
