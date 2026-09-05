export interface PeriodModel {
  id: string;
  status: PeriodStatus;
  startDate: Date;
  endDate?: Date;
}

export type PeriodStatus = 'open' | 'closed';

export class Period implements PeriodModel {
  id: string;
  endDate?: Date;
  startDate: Date;
  status: PeriodStatus;

  constructor( period: Period) {
    this.id = period.id;
    this.endDate = period.endDate;
    this.startDate = period.startDate;
    this.status = period.status;
  }

  registeredEnDate(endDate: Date) {
    if (this.status === "closed") {
      throw new Error('You cannot set a closing date if the period is closed.');
    }
    this.endDate = endDate;
  }

  closePeriod(period: PeriodStatus) {
    if (this.endDate === undefined) {
      throw new Error('The period cannot be closed without a closing date.');
    }
    this.status = 'closed';
  }
}

