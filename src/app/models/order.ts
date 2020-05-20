import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Car } from './car';
import { Place } from './place';
import { User } from './user';

export interface UpdateOrder {
  id?: number;
  placeId: number;
  dateFrom: string | NgbDate;
  dateTo: string | NgbDate;
  orderSum: number;
  time: string | NgbTimeStruct;
}

export interface Order extends UpdateOrder {
  carId: number;
  status?: OrderStatus;
  statusText?: string;
  statusClass?: string;

  car?: Car;
  place?: Place;
  user?: User;
}

export enum OrderStatus {
  Planned = 1,
  Active = 2,
  Canceled = 3,
  Complete = 4,
}
export interface DateRange {
  dateFrom: NgbDate;
  dateTo?: NgbDate;
}
