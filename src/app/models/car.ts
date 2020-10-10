import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { BodyTypes, FuelType, KPP, AC, SteeringType, WheelDrive } from './enums';

export interface Car {
  id?: number;
  img: string;
  name: string;
  description: string;
  price: number;
  bodyType: BodyTypes;
  fuelType: FuelType;
  fuelCity: number;
  fuelTrack: number;
  enginePower: number;
  engineVolume?: number;
  maxSpeed?: number;
  accelerationTime?: number;
  kpp: KPP;
  gears: number;
  wheelDrive: WheelDrive;
  doors: number;
  sits: number;
  airbags?: number;
  AC: AC;
  steering: SteeringType;
  trunkVolume: number;
  createYear?: number;
}

export interface Comment {
  id?: number;
  carId: number;
  userId: number;
  date: NgbDate;
  time: NgbTimeStruct;
  comment: string;
  likes?: number;
  dislikes?: number;
}