import { CarEntity } from "../../../../../../../libs/interfaces/modules/car/entities/car.entity";

export interface CarFindInterface {
    cars: CarEntity[],
    count: number
  }