import {HourTypeOptions} from "../enums/hour-types.enum";

export interface TimeEntry {
  id: string;
  personId: string;
  projectId: string;
  date: Date;
  hours: number;
  type: HourTypeOptions;
}
