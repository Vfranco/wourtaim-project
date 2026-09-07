import {PersonStatusOptions} from "../enums/person-status.enum";

export interface Person {
  id: string;
  name: string;
  firstName: string;
  status: PersonStatusOptions ;
}
