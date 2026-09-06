import { BrandedId } from '../branded-id';
import { PersonId } from './person.type';
import { ProjectId } from './project.type';
import { WorkShiftType } from './work-shift.type';

export type HoursRecordId = BrandedId<'HoursRecordId'>;

export type Minutes = number & { readonly __brand: 'Minutes' };

export function createMinutes(value: number): Minutes {
  if (!Number.isInteger(value)) {
    throw new Error('Minutes must be an integer');
  }
  if (value < 0) {
    throw new Error('Minutes must be non-negative');
  }
  return value as Minutes;
}

export interface HoursRecord {
  id: HoursRecordId;
  personId: PersonId;
  projectId: ProjectId;
  date: Date;
  minutes: Minutes;
  shiftType: WorkShiftType;
}
