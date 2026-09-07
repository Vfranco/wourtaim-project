import {GeneralStatusOptions} from "../enums/general-status.enum";

export interface Project {
  id: number;
  name: string;
  status: GeneralStatusOptions;
  description: string;
}
