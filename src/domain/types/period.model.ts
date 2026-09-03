import type { PeriodId } from "../shared/ids";

interface OpenPeriod {
  id: PeriodId;
  status: 'open';
  startDate: Date;
  endDate: Date;
}

interface ClosedPeriod {
  id: PeriodId;
  status: 'closed';
  startDate: Date;
  endDate: Date;
  closedAt: Date;
}

export type Period = OpenPeriod | ClosedPeriod;
