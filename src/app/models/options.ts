import { BodyTypes, FuelType, KPP, AC, SteeringType } from './enums';

export interface Option{
    value: string;

}

export interface BodyOption extends Option{
    type: BodyTypes
}

export interface FuelOption extends Option{
    type: FuelType
}

export interface KppOption extends Option{
    type: KPP
}

export interface AcOption extends Option{
    type: AC
}

export interface SteeringOption extends Option{
    type: SteeringType
}

export const bodyOptions: BodyOption[] = [
    {
      type: BodyTypes.Sedan,
      value: 'Седан',
    },
    {
      type: BodyTypes.HatchBack,
      value: 'Хэтчбек',
    },
    {
      type: BodyTypes.Wagon,
      value: 'Универсал',
    },
    {
      type: BodyTypes.SportWagon,
      value: 'Лифтбек',
    },
    {
      type: BodyTypes.Coupe,
      value: 'Купе',
    },
    {
      type: BodyTypes.Cabrio,
      value: 'Кабриолет',
    }
  ];

  export const fuelOptions: FuelOption[] = [
    {
      type: FuelType.F92,
      value: 'АИ-92',
    },
    {
      type: FuelType.F95,
      value: 'АИ-95',
    },
    {
      type: FuelType.F98,
      value: 'АИ-98',
    },
    {
      type: FuelType.F100,
      value: 'АИ-100',
    },
    {
      type: FuelType.Diesel,
      value: 'Дизельное топливо',
    }
  ];

  export const kppOptions: KppOption[] = [
    {
      type: KPP.Manual,
      value: 'Механическая',
    },
    {
      type: KPP.Auto,
      value: 'Автоматическая',
    },
    {
      type: KPP.SemiAuto,
      value: 'Роботизированная',
    },
    {
      type: KPP.Variator,
      value: 'Вариатор',
    }
  ];

  export const acOptions: AcOption[] = [
    {
      type: AC.None,
      value: 'Нет',
    },
    {
      type: AC.OneZone,
      value: 'Однозонный',
    },
    {
      type: AC.TwoZone,
      value: 'Двухзонный',
    },
    {
      type: AC.ThreeZone,
      value: 'Трехзонный',
    },
    {
      type: AC.FourZone,
      value: 'Четырехзонный',
    }
  ];

  export const steeringOptions: SteeringOption[] = [
    {
      type: SteeringType.Left,
      value: 'Левый руль',
    },
    {
      type: SteeringType.Right,
      value: 'Правый руль',
    }
  ];