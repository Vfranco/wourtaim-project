import { WorkShiftModel } from './work-shift.model';

export interface HoursRecord {
  id: string;
  personId: string;
  projectId: string;
  date: Date;
  minutes: number;
  shiftType: WorkShiftModel;
}
