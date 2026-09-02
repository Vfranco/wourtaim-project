import type { PersonId } from "./shared/ids";

interface Person {
  id: PersonId;
  name: string;
  active: boolean;
}
