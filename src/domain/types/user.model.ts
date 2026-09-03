import type { UserId } from '../shared/ids';

interface User {
  id: UserId;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
}
