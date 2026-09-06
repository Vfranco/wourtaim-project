import { BrandedId } from '../branded-id';

export type UserId = BrandedId<'UserId'>;

export interface User {
  id: UserId;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
}
