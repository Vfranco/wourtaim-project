import {UserRolesOptions} from "../enums/user-roles.enum";

export interface User {
  id: number;
  personId: number;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRolesOptions;
}
