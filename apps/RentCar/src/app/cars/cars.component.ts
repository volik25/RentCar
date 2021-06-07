import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarOrderComponent } from './car-order/car-order.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { CarEntity } from '@rent/interfaces/modules/car/entities/car.entity';
import { CarService } from '../_services/car.service';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less']
})
export class CarsComponent implements OnInit {
  cars: CarEntity[];
  filters: any;
  params: any;
  showFilters = false;
  closeResult: string;
  public page = 1;
  public pageSize = 9;
  sortSelect: FormGroup;
  public querySubscription: Subscription;
  constructor(private carService: CarService,
              private loadingService: LoadingService,
              private ms:NgbModal,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.sortSelect = this.fb.group({
      sorting: ['A-Z']
    });

    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.params = queryParam;
        this.loadCars()
      }
    );
  }

  ngOnInit(): void {
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
    const requests = [this.carService.find<CarEntity[]>(this.params), this.carService.getCarsFilters<any>()];
    const subscription = forkJoin(requests).subscribe(([cars, filters]) => {
      this.cars = cars;
      this.filters = filters;
      this.sortSelect.get('sorting').setValue('A-Z');
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }

  update(data){
    if (data == 'reset') {
      this.loadCars();
      this.router.navigate(['/cars']);
      this.showFilters = false;
    }
    else {
      this.router.navigate(['/cars'], {queryParams: data});
    };
  }

  toCar(id){
    this.router.navigate(['/cars', id]);
    sessionStorage.setItem('queryParams', JSON.stringify(this.params));
    sessionStorage.setItem('cars', JSON.stringify(this.cars));
  }

  modalOpen(car){
    const modal = this.ms.open(CarOrderComponent, {centered: true, size: 'lg'});
    modal.componentInstance.car = car;
    modal.result.then((res)=>{
      this.closeResult = res;
    });
  }

}
