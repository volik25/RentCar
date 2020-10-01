import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { bodyOptions, fuelOptions, kppOptions, acOptions, wdOptions, steeringOptions } from 'src/app/models/options';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cars-filters',
  templateUrl: './cars-filters.component.html',
  styleUrls: ['./cars-filters.component.less']
})
export class CarsFiltersComponent implements OnInit {
  @Input() cars:Car[];
  @Input() filters: any;
  @Input() params: any;
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
    this.setOptions(this.filters);
    if (!this.isEmpty(this.params)) {
      this.filtersForm.patchValue(this.params);
      if (this.params.hasAirbags) {
        this.filtersForm.get('hasAirbags').setValue(this.params.hasAirbags === 'true');
      }
      if (this.params.AC) {
        this.filtersForm.get('AC').setValue(this.params.AC === 'true');
      }
      this.filtersForm.get('price').setValue([this.params.minPrice, this.params.maxPrice]);
    }
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

  setOptions(filters){
    this.maxValue = filters.price[1];
    this.minValue = filters.price[0];
    this.doorsCount = filters.doors;
    this.sitsCount = filters.sits;
    this.years = filters.createYear;
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

  setFilters(){
    let params = this.filtersForm.getRawValue();
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        if (key == 'price') {
          params.minPrice = value[0];
          params.maxPrice = value[1]
          delete params[key];
          break;
        }
      }
    }
    this.data.emit(params);
  }

  reset(){
    this.data.emit('reset');
    this.filtersForm.reset({price: [this.options.floor, this.options.ceil]});
  }

  clearFilter(control){
    const form = this.filtersForm.getRawValue();
    for (const controlName in form) {
      if (controlName == control) {
        if (control == 'price') this.filtersForm.get('price').setValue([this.options.floor, this.options.ceil]);
        else this.filtersForm.get(controlName).reset();
      }
    }
  }

  isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }
}
