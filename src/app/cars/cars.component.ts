import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../models/car';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { Options } from 'ng5-slider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoComponent } from './car-info/car-info.component';
import { CarOrderComponent } from './car-order/car-order.component';

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less']
})
export class CarsComponent implements OnInit {
  cars: Car[];
  allCars: Car[];
  showFilters = false;
  closeResult: string;
  public page = 1;
  public pageSize = 9;
  constructor(private api: ApiService, private loadingService: LoadingService, private ms:NgbModal) {
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

  modalOpen(car, param){
    if (param == 'info') {
      const modal = this.ms.open(CarInfoComponent, {centered: true, size: 'lg'});
      modal.componentInstance.car = car;
      modal.result.then((res)=>{
        this.closeResult = res;
      });
    }
    if (param == 'order') {
      const modal = this.ms.open(CarOrderComponent, {centered: true, size: 'lg'});
      modal.componentInstance.car = car;
      modal.result.then((res)=>{
        this.closeResult = res;
      });
    }
  }
}
