import type { UserId } from '../shared/ids';

export interface User {
  id: UserId;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
}
