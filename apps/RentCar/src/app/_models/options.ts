import { AC } from "@rent/interfaces/enums/ac.enum";
import { BodyTypes } from "@rent/interfaces/enums/bodyTypes.enum";
import { FuelType } from "@rent/interfaces/enums/fuelTypes.enum";
import { KPP } from "@rent/interfaces/enums/kpp.enum";
import { SteeringType } from "@rent/interfaces/enums/steeringType.enum";
import { WheelDrive } from "@rent/interfaces/enums/wheelDrive.enum";

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

export interface WDOption extends Option{
    type: WheelDrive
}

export interface AcOption extends Option{
    type: AC
}

export interface SteeringOption extends Option{
    type: SteeringType
}

export const bodyOptions: BodyOption[] = [
    {
      type: BodyTypes.SEDAN,
      value: 'Седан',
    },
    {
      type: BodyTypes.HATCHBACK,
      value: 'Хэтчбек',
    },
    {
      type: BodyTypes.WAGON,
      value: 'Универсал',
    },
    {
      type: BodyTypes.SPORTWAGON,
      value: 'Лифтбек',
    },
    {
      type: BodyTypes.COUPE,
      value: 'Купе',
    },
    {
      type: BodyTypes.CABRIO,
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
      type: FuelType.DIESEL,
      value: 'Дизельное топливо',
    }
  ];

  export const kppOptions: KppOption[] = [
    {
      type: KPP.MANUAL,
      value: 'Механическая',
    },
    {
      type: KPP.AUTO,
      value: 'Автоматическая',
    },
    {
      type: KPP.SEMIAUTO,
      value: 'Роботизированная',
    },
    {
      type: KPP.VARIATOR,
      value: 'Вариатор',
    }
  ];

  export const wdOptions: WDOption[] = [
      {
          type: WheelDrive.FWD,
          value: 'Передний привод'
      },
      {
          type: WheelDrive.RWD,
          value: 'Задний привод'
      },
      {
          type: WheelDrive.AWD,
          value: 'Полный привод'
      }
  ]

  export const acOptions: AcOption[] = [
    {
      type: AC.NONE,
      value: 'Нет',
    },
    {
      type: AC.ONE_ZONE,
      value: 'Однозонный',
    },
    {
      type: AC.TWO_ZONE,
      value: 'Двухзонный',
    },
    {
      type: AC.THREE_ZONE,
      value: 'Трехзонный',
    },
    {
      type: AC.FOUR_ZONE,
      value: 'Четырехзонный',
    }
  ];

  export const steeringOptions: SteeringOption[] = [
    {
      type: SteeringType.LEFT,
      value: 'Левый руль',
    },
    {
      type: SteeringType.RIGHT,
      value: 'Правый руль',
    }
  ];