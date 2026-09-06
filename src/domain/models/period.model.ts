export interface OpenPeriod {
  id: string;
  startDate: Date;
  status: 'open';
}

export interface ClosedPeriod {
  id: string;
  startDate: Date;
  status: 'closed';
  closedAt: Date;
}

export type Period = OpenPeriod | ClosedPeriod;
