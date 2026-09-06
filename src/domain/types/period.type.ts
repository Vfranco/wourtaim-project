import { BrandedId } from '../branded-id';

export type PeriodId = BrandedId<'PeriodId'>;

interface BasePeriod {
  id: PeriodId;
  startDate: Date;
}

export interface OpenPeriod extends BasePeriod {
  status: 'open';
}

export interface ClosedPeriod extends BasePeriod {
  status: 'closed';
  closedAt: Date;
}

export type Period = OpenPeriod | ClosedPeriod;
