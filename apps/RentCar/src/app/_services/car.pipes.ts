import { Pipe, PipeTransform } from '@angular/core';
import { AC } from '@rent/interfaces/enums/ac.enum';
import { BodyTypes } from '@rent/interfaces/enums/bodyTypes.enum';
import { FuelType } from '@rent/interfaces/enums/fuelTypes.enum';
import { KPP } from '@rent/interfaces/enums/kpp.enum';
import { SteeringType } from '@rent/interfaces/enums/steeringType.enum';
import { WheelDrive } from '@rent/interfaces/enums/wheelDrive.enum';
import { OrderStatus } from '../_models/order';

@Pipe({name: 'BodyTypes'})
export class BodyTypesPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
      case BodyTypes.SEDAN: {
        return "Седан";
      }
      case BodyTypes.HATCHBACK: {
          return "Хэтчбек"
      }
      case BodyTypes.WAGON: {
          return "Универсал"
      }
      case BodyTypes.SPORTWAGON: {
        return "Лифтбек";
      }
      case BodyTypes.COUPE: {
        return "Купе";
      }
      case BodyTypes.CABRIO: {
        return "Кабриолет";
      }
      default: ;
    }
  }
}

@Pipe({ name: 'carKPP' })
export class CarKppPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
      case KPP.MANUAL: {
        return "МКПП";
      }
      case KPP.AUTO: {
          return "АКПП"
      }
      case KPP.SEMIAUTO: {
          return "Робот"
      }
      case KPP.VARIATOR: {
        return "Вариатор";
      }
      default: ;
    }
  }
}

@Pipe({ name: 'carInfoKPP' })
export class CarInfoKppPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
      case KPP.MANUAL: {
        return "Механическая";
      }
      case KPP.AUTO: {
          return "Автоматическая"
      }
      case KPP.SEMIAUTO: {
          return "Роботизированная"
      }
      case KPP.VARIATOR: {
        return "Вариаторная";
      }
      default: ;
    }
  }
}

@Pipe({ name: 'carWD' })
export class CarWheelDrivePipe implements PipeTransform {
  transform(value): String {
    switch (value) {
      case WheelDrive.FWD: {
        return "Передний";
      }
      case WheelDrive.RWD: {
          return "Задний"
      }
      case WheelDrive.AWD: {
          return "Полный"
      }
      default: ;
    }
  }
}

@Pipe({ name: 'carAC' })
export class CarACPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
        case AC.NONE: {
            return "без AC";
        }
        default: {
            return "AC";
        };
    }
  }
}

@Pipe({ name: 'carInfoAC' })
export class CarInfoACPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
      case AC.NONE: {
          return "Не установлен";
      }
      case AC.ONE_ZONE: {
          return "Однозонный"
      }
      case AC.TWO_ZONE: {
        return "Двухзонный"
      }
      case AC.THREE_ZONE: {
        return "Трехзонный"
      }
      case AC.FOUR_ZONE: {
        return "Четырехзонный"
      }
      default: ;
    }
  }
}

@Pipe({ name: 'carFuel' })
export class CarFuelPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
        case FuelType.DIESEL: {
            return "ДТ";
        }
        case FuelType.F92: {
            return "АИ-92";
        }
        case FuelType.F95: {
            return "АИ-95";
        }
        case FuelType.F98: {
            return "АИ-98";
        }
        case FuelType.F100: {
            return "АИ-100";
        }
        default: ;
    }
  }
}

@Pipe({ name: 'steeringType' })
export class SteeringPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
        case SteeringType.LEFT: {
            return "Левый руль";
        }
        case SteeringType.RIGHT: {
            return "Правый руль";
        }
        default: ;
    }
  }
}

@Pipe({ name: 'orderStatus' })
export class StatusPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
        case OrderStatus.Planned: {
            return "Оформлен";
        }
        case OrderStatus.Active: {
            return "Активен";
        }
        case OrderStatus.Canceled: {
            return "Отменен";
        }
        case OrderStatus.Complete: {
            return "Выполнен";
        }
        default: ;
    }
  }
}