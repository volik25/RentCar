import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { bodyOptions, fuelOptions, kppOptions, acOptions, wdOptions, steeringOptions } from 'src/app/models/options';
import { AC } from 'src/app/models/enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cars-filters',
  templateUrl: './cars-filters.component.html',
  styleUrls: ['./cars-filters.component.less']
})
export class CarsFiltersComponent implements OnInit {
  @Input() cars:Car[];
  @Input() allCars: Car[];
  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  filteredCars: Car[] = [];
  subscription: Subscription = new Subscription;
  public bodyTypes = bodyOptions;
  public fuelTypes = fuelOptions;
  public kppTypes = kppOptions;
  public acTypes = acOptions;
  public wdTypes = wdOptions;
  public steeringTypes = steeringOptions;
  public doorsCount = [];
  public sitsCount = [];
  public years = [];
  public planFilter = 0;
  public factFilter = 0;
  public minValue = 0;
  public maxValue = 0;
  public options: Options = {
    floor: 0,
    ceil: 0
  };
  filtersForm: FormGroup;

  constructor( private api: ApiService, private fb: FormBuilder, private loadingService: LoadingService) { }

  ngOnInit() {
    this.initForm();
    this.setOptions(this.cars);
  }

  initForm(){
    this.filtersForm = this.fb.group({
      price: this.fb.control ([this.minValue, this.maxValue]),
      bodyType:[null],
      fuelType:[null],
      kpp:[null],
      wheelDrive:[null],
      doors:[null],
      sits:[null],
      hasAirbags: [null],
      AC:[null],
      steering:[null],
      createYear:[null]
    });
  }

  setOptions(carArray){
    carArray.forEach(car => {
      if (car.price > this.maxValue) this.maxValue = car.price;
      if (car.price < this.minValue) this.minValue = car.price;
      else if (this.minValue == 0) this.minValue = this.maxValue;
      if (!this.doorsCount.includes(car.doors))this.doorsCount.push(car.doors);
      if (!this.sitsCount.includes(car.sits)) this.sitsCount.push(car.sits);
      if (!this.years.includes(car.createYear)) this.years.push(car.createYear);
    });
    if (this.doorsCount.length > 1) this.doorsCount.sort();
    if (this.sitsCount.length > 1) this.sitsCount.sort();
    if (this.years.length > 1) this.years.sort();
    this.options.floor = this.minValue;
    this.options.ceil = this.maxValue;

    this.filtersForm.get('price').setValue([this.minValue, this.maxValue]);
    this.options.translate = (value: number, label: LabelType): string => {
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

  refresh(){
    this.planFilter = 0;
    this.filteredCars = [];
    const params = this.filtersForm.getRawValue();
    for (const i in params) {
      const filter = params[i];
      if (filter == null) {
        delete params[i];
      }
      else{
        this.planFilter++;
      }
    }
    this.allCars.forEach(car => {
      this.factFilter = 0;
      for (const propKey in car) {
        const property = car[propKey];
        for (const paramKey in params) {
          const filter = params[paramKey];
          if (paramKey == 'hasAirbags' && propKey == 'airbags') {
            if (property && filter == true) this.factFilter++;
            if (!property && filter == false) this.factFilter++;
            else break;
          }
          if (paramKey == propKey){
            if (paramKey == 'price' && propKey == 'price') {
              if (property>=filter[0] && property<=filter[1]) this.factFilter++;
              else break;
            }
            if (propKey == 'AC') {
              if (filter == false && property == AC.None) this.factFilter++;
              if (filter == true && property != AC.None) this.factFilter++;
              else break;
            }
            else if (property == filter) this.factFilter++;
          }
        }
      }
      if(this.planFilter == this.factFilter){
        this.filteredCars.push(car);
      }
    });
    this.data.emit(this.filteredCars);
  }

  reset(){
    this.data.emit('reset');
    this.filtersForm.reset({price: [this.options.floor, this.options.ceil]});
  }

  clearFilter(control){
    const form = this.filtersForm.getRawValue();
    for (const controlName in form) {
      if (controlName == control) {
        if (control == 'price') this.filtersForm.reset({price: [this.options.floor, this.options.ceil]});
        else this.filtersForm.get(controlName).reset();
      }
    }
  }
}
