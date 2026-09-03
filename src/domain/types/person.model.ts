import type { PersonId } from "../shared/ids";

export interface Person {
  id: PersonId;
  name: string;
  active: boolean;
}
