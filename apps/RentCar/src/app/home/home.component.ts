import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../_services/loading.service';
import { Router } from '@angular/router';
import { NgbDate, NgbTimeStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarEntity } from '@rent/interfaces/modules/car/entities/car.entity';
import { OrderEntity } from '@rent/interfaces/modules/order/entities/order.entity';
import { FindCarTypes } from '@rent/interfaces/enums/findCarsType.enum';
import { CarService } from '../_services/car.service';
import { OrderService } from '../_services/order.service';
import { switchMap } from 'rxjs/internal/operators';
import { OrderStatusEnum } from '@rent/interfaces/enums/order.status.enum';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public lowCars: CarEntity[];
  public hightCars: CarEntity[];
  public completeOrders: OrderEntity[];
  closeResult;

  
  get OrderStatus() {
    return OrderStatusEnum
  }

  constructor(
    private carService: CarService,
    private orderService: OrderService,
    private loadingService: LoadingService, 
    private router: Router,
    private ms: NgbModal) { }

  ngOnInit() {
    const subscription = this.carService.find<CarEntity>({ findType: FindCarTypes.LOW_CARS })
    .pipe(
      switchMap(lowCost => {
        this.lowCars = lowCost;
        return this.carService.find<CarEntity>({ findType: FindCarTypes.HIGHT_CARS })
      }),
      switchMap(hightCost => {
        this.hightCars = hightCost;
        return this.orderService.find<OrderEntity>({ findOrderTypes: 'main'})
      })
    ).subscribe(orders => {
      this.completeOrders = orders;
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }

  toCar(id){
    this.router.navigate(['/cars', id]);
    sessionStorage.setItem('cars', JSON.stringify(this.hightCars.concat(this.lowCars)));
  }

  public ngbDateToString(date: NgbDate): string {
    if(!date){
      return null;
    }
    const newDate = new Date(date.year, date.month - 1, date.day);
    const [year, month, day] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year < 10 ? `0${year}` : year}`;
  }

  public ngbTimeToString(time: NgbTimeStruct): string {
    return `${time.hour < 10 ? `0${time.hour}` : time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}`;
  }
}
