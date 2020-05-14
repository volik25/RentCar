import { DateRange } from './order';

export interface Car {
  id?: number;
  img: string;
  name: string;
  description: string;
  price: number;
  fuelType: string;
  engineVolume?: number;
  enginePower: number;
  speed?: number;
  time?: number;
  volumePerHundred?: number;
  kpp: string;
  driveUnit: string;
  places: number;
  backVolume?: number;
  license?: string;
  createYear?: number;
  dates?: DateRange[];
}
