import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Order, OrderStatus } from 'src/app/models/order';
import { LoadingService } from 'src/app/services/loading.service';
import { NgbDate, NgbTimeStruct, NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CarOrderComponent } from 'src/app/cars/car-order/car-order.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit, OnDestroy {
  public orders: Order[];
  public statusesChanged = [];
  public isAdmin = true;
  public page = 1;
  public pageSize = 9;
  constructor(private api: ApiService, private loadingService: LoadingService,
              private ms: NgbModal, private auth: AuthService,
              private calendar: NgbCalendar) { }

  ngOnInit() {
    const subscription = this.api.checkAccess().subscribe(res => {
      this.isAdmin = res;
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
    this.loadCars();
  }

  ngOnDestroy(){
    if (this.statusesChanged.length > 0) {
      const subscription = this.api.updateStatuses(this.statusesChanged).subscribe(res => {
        //console.log(res);
        this.loadingService.removeSubscription(subscription);
      })
      this.loadingService.addSubscription(subscription);
    }
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

  changeStatus(order:Order){
    const today = this.calendar.getToday();
    switch (order.status) {
      case OrderStatus.Planned:
        if (today.after(order.dateFrom as NgbDate) && today.before(order.dateTo as NgbDate)) {
          order.status = OrderStatus.Active;
          this.statusesChanged.push({id: order.id, status: order.status});
        }
        break;
      case OrderStatus.Active:
        if (today.after(order.dateFrom as NgbDate) && today.after(order.dateTo as NgbDate)) {
          order.status = OrderStatus.Complete;
          this.statusesChanged.push({id: order.id, status: order.status});
        }
        break;
      case OrderStatus.Canceled:
        if (today.before(order.dateFrom as NgbDate) && today.before(order.dateTo as NgbDate)) {
          order.status = OrderStatus.Planned;
          this.statusesChanged.push({id: order.id, status: order.status});
        }
        if (today.after(order.dateFrom as NgbDate) && today.before(order.dateTo as NgbDate)) {
          order.status = OrderStatus.Active;
          this.statusesChanged.push({id: order.id, status: order.status});
        }
        break;
    }
    // switch (order.status) {
    //   case OrderStatus.Planned:
    //     order.status = OrderStatus.Active;
    //     this.statusesChanged.push({id: order.id, status: order.status});
    //     break;
    //   case OrderStatus.Active:
    //     order.status = OrderStatus.Complete;
    //     this.statusesChanged.push({id: order.id, status: order.status});
    //     break;
    //   case OrderStatus.Complete:
    //     order.status = OrderStatus.Canceled;
    //     this.statusesChanged.push({id: order.id, status: order.status});
    //     break;
    //   case OrderStatus.Canceled:
    //     order.status = OrderStatus.Planned;
    //     this.statusesChanged.push({id: order.id, status: order.status});
    //     break;
    // }
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
