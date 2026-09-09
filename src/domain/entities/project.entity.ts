import {GeneralStatusOptions} from "../enums/general-status.enum";

export interface Project {
  id: string;
  name: string;
  status: GeneralStatusOptions;
  description: string;
}
