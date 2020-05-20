import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../models/order';

@Pipe({name: 'BodyTypes'})
export class BodyTypesPipe implements PipeTransform {
  transform(value): String {
    switch (value) {
      case "1": {
        return "Седан";
      }
      case "2": {
          return "Хэтчбек"
      }
      case "3": {
          return "Универсал"
      }
      case "4": {
        return "Лифтбек";
      }
      case "5": {
        return "Купе";
      }
      case "6": {
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
      case "1": {
        return "МКПП";
      }
      case "2": {
          return "АКПП"
      }
      case "3": {
          return "Робот"
      }
      case "4": {
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
      case "1": {
        return "Механическая";
      }
      case "2": {
          return "Автоматическая"
      }
      case "3": {
          return "Роботизированная"
      }
      case "4": {
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
      case "1": {
        return "Передний";
      }
      case "2": {
          return "Задний"
      }
      case "3": {
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
        case "0": {
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
      case "0": {
          return "Не установлен";
      }
      case "1": {
          return "Однозонный"
      }
      case "2": {
        return "Двухзонный"
      }
      case "3": {
        return "Трехзонный"
      }
      case "4": {
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
        case "0": {
            return "ДТ";
        }
        case "92": {
            return "АИ-92";
        }
        case "95": {
            return "АИ-95";
        }
        case "98": {
            return "АИ-98";
        }
        case "100": {
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
        case "1": {
            return "Левый руль";
        }
        case "2": {
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
            return "В работе";
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