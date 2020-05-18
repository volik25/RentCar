import { Pipe, PipeTransform } from '@angular/core';

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