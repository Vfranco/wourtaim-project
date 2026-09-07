import {GeneralStatusOptions} from "../enums/general-status.enum";

export interface OpenPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  status: GeneralStatusOptions;
}

