import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { Car } from '../models/car';
import { forkJoin } from 'rxjs';
import { Order } from '../models/order';
import { NgbDate, NgbTimeStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CarInfoComponent } from '../cars/car-info/car-info.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public lowCars: Car[];
  public hightCars: Car[];
  public completeOrders: Order[];
  closeResult;
  constructor(private api: ApiService, private loadingService: LoadingService, 
              private router: Router, private ms: NgbModal) { }

  ngOnInit() {
    const requests = [this.api.getCars(1), this.api.getCars(2), this.api.getOrders(true)];
    const subscription = forkJoin(requests).subscribe(([lowCost, hightCost, orders]) => {
      this.lowCars = lowCost;
      this.hightCars = hightCost;
      this.completeOrders = orders;
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }

  toCar(car){
    this.router.navigate(['/cars']);
    const modal = this.ms.open(CarInfoComponent, {centered: true, size: 'lg'});
      modal.componentInstance.car = car;
      modal.result.then((res)=>{
        this.closeResult = res;
      });
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
