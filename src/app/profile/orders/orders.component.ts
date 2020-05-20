import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Order } from 'src/app/models/order';
import { LoadingService } from 'src/app/services/loading.service';
import { NgbDate, NgbTimeStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarOrderComponent } from 'src/app/cars/car-order/car-order.component';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {
  public orders: Order[];
  public date;
  public page = 1;
  public pageSize = 9;
  constructor(private api: ApiService, private loadingService: LoadingService,
              private ms: NgbModal) { }

  ngOnInit() {
    this.loadCars();
  }

  loadCars(){
    const subscription = this.api.getOrders().subscribe(orders => {
      this.orders = orders;
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }

  modalOpen(order:Order){
    const modal = this.ms.open(CarOrderComponent, {centered: true, size: 'xl', });
    console.log(order);
    modal.componentInstance.order = order;
    modal.componentInstance.car = order.car;
    modal.result.then((res)=>{
      this.loadCars();
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
