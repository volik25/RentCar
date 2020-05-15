import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'cars-filters',
  templateUrl: './cars-filters.component.html',
  styleUrls: ['./cars-filters.component.less']
})
export class CarsFiltersComponent implements OnInit {
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'От: ' + value + '₽';
        case LabelType.High:
          return 'До: ' + value + '₽';
        default:
          return value + '₽';
      }
    }
  }
  
  filtersForm: FormBuilder;

  constructor() { }

  ngOnInit() {
  }

}
