import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../models/car';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less']
})
export class CarsComponent implements OnInit {
  cars: Car[];
  allCars: Car[];
  showFilters = false;
  public page = 1;
  public pageSize = 5;
  constructor(private api: ApiService, private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(){
    const subscription = this.api.getCars().subscribe(cars => {
      this.cars = cars;
      this.allCars = cars;
      this.showFilters = true;
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }

  update(data){
    if (data == 'reset') this.loadCars()
    else this.cars = data;
  }
}
