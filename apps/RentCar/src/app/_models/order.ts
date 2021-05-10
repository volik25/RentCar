import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Car } from './car';
import { Place } from './place';
import { User } from './user';

export interface UpdateOrder {
  id?: number;
  placeId: number;
  dateFrom: NgbDate | string;
  dateTo: NgbDate | string;
  orderSum: number;
  time: NgbTimeStruct | string;
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
  Planned = '1',
  Active = '2',
  Complete = '3',
  Canceled = '4',
}
export interface CarDates {
  dateFrom: NgbDate | string;
  dateTo?: NgbDate | string;
}
