import { BrandedId } from '../branded-id';

export type PersonId = BrandedId<'PersonId'>;

export interface Person {
  id: PersonId;
  name: string;
  active: boolean;
}
