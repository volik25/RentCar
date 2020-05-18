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
  minValue: number = 0;
  maxValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 0
  }
  filtersForm: FormGroup;

  constructor( private api: ApiService, private fb: FormBuilder, private loadingService: LoadingService) { }

  ngOnInit() {
    this.setOptions(this.cars);
    this.initForm();
  }

  initForm(){
    this.filtersForm = this.fb.group({
      price: new FormGroup({
        priceRange: new FormControl([this.minValue, this.maxValue]),
      }),
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
    for (let i = 0; i < carArray.length; ++i) {
      if (carArray[i].price > this.maxValue) this.maxValue = carArray[i].price;
      if (carArray[i].price < this.minValue) this.minValue = carArray[i].price;
      if (!this.doorsCount.includes(carArray[i].doors))this.doorsCount.push(carArray[i].doors);
      if (!this.sitsCount.includes(carArray[i].sits)) this.sitsCount.push(carArray[i].sits);
      if (!this.years.includes(carArray[i].createYear)) this.years.push(carArray[i].createYear);
    }
    if (this.doorsCount.length > 1) this.doorsCount.sort();
    if (this.sitsCount.length > 1) this.sitsCount.sort();
    if (this.years.length > 1) this.years.sort();
    if (this.cars) {
      this.options.floor = this.minValue;
      this.options.ceil = this.maxValue;
    }
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
    this.cars.forEach(car => {
      this.factFilter = 0;
      for (const propKey in car) {
        const property = car[propKey];
        for (const paramKey in params) {
          const filter = params[paramKey];
          if (paramKey == 'price' && propKey == 'price') {
            if (property>=filter.priceRange[0] && property<=filter.priceRange[1]) this.factFilter++;
            else break;
          }
          if (paramKey == 'hasAirbags' && propKey == 'airbags') {
            if (property == filter) this.factFilter++;
            else break;
          }
          if (paramKey == propKey){
            if (propKey == 'AC' && property == AC.None || property == 'price') {
              break;
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
    this.filtersForm.reset();
    this.options.floor = this.minValue;
    this.options.ceil = this.maxValue;
    this.data.emit('reset');
  }
}
