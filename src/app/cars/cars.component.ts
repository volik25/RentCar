import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../models/car';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { Options } from 'ng5-slider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoComponent } from './car-info/car-info.component';
import { CarOrderComponent } from './car-order/car-order.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less']
})
export class CarsComponent implements OnInit {
  cars: Car[];
  allCars: Car[];
  sortCars: Car[];
  showFilters = false;
  closeResult: string;
  public page = 1;
  public pageSize = 9;
  sortSelect: FormGroup;
  constructor(private api: ApiService, private loadingService: LoadingService, private ms:NgbModal, private fb: FormBuilder) {
    this.sortSelect = this.fb.group({
      sorting: ['A-Z']
    })
  }

  ngOnInit(): void {
    this.loadCars();
    this.sortSelect.get('sorting').valueChanges.subscribe((value) => {
      if (this.cars.length > 0) {
        switch (value) {
          case 'A-Z':
            this.cars.sort((car1, car2) => {
              if (car1.name > car2.name) return 1;
              if (car1.name < car2.name) return -1;
            });
            break;
          case 'Z-A':
            this.cars.sort((car1, car2) => {
              if (car1.name < car2.name) return 1;
              if (car1.name > car2.name) return -1;
            });
            break;
          case 'priceDown':
            this.cars.sort((car1, car2) => car1.price - car2.price).reverse();
            break;
          case 'priceUp':
            this.cars.sort((car1, car2) => car1.price - car2.price);
            break;
          case 'carsDown':
            this.cars.sort((car1, car2) => car1.createYear - car2.createYear).reverse();
            break;
          case 'carsUp':
            this.cars.sort((car1, car2) => car1.createYear - car2.createYear);
            break;
          default:
            break;
        }
      }
    })
  }

  loadCars(){
    const subscription = this.api.getCars().subscribe(cars => {
      this.cars = cars;
      this.allCars = cars;
      this.sortCars = cars;
      this.showFilters = true;
      this.sortSelect.get('sorting').setValue('A-Z');
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }

  update(data){
    if (data == 'reset') this.loadCars();
    else {
      this.cars = data;
      this.sortCars = data.sort();
    };
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
