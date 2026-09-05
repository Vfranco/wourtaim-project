import {Person} from "./person.model";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  employee: Person;
  role: 'admin' | 'user';
}
