import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  NgbDate,
  NgbTimeStruct,
  NgbModal,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderEntity } from '@rent/interfaces/modules/order/entities/order.entity';
import { OrderService } from '@rent/web/_services/order.service';
import { CarOrderComponent } from '@rent/web/cars/car-order/car-order.component';
import { AuthService } from '@rent/web/_services/auth.service';
import { LoadingService } from '@rent/web/_services/loading.service';
import { OrderStatusEnum } from '@rent/interfaces/enums/order.status.enum';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  public orders: OrderEntity[];
  public allOrders: OrderEntity[];
  public newStatuses = [];
  public statusesChanged = [];
  public isAdmin = true;
  public forciblyStatuses: FormGroup;
  public page = 1;
  public pageSize = 9;
  public statuses: number = 1;

  get OrderStatus() {
    return OrderStatusEnum
  }

  constructor(
    private orderService: OrderService,
    private loadingService: LoadingService,
    private ms: NgbModal,
    private auth: AuthService,
    private calendar: NgbCalendar,
    private fb: FormBuilder
  ) {
    this.forciblyStatuses = this.fb.group({
      statusCheck: false,
    });
  }

  ngOnInit() {
    // const subscription = this.api.checkAccess().subscribe((res) => {
    //   this.isAdmin = res;
    //   this.loadingService.removeSubscription(subscription);
    // });
    // this.loadingService.addSubscription(subscription);
    this.loadCars();
    this.forciblyStatuses.get('statusCheck').valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  ngOnDestroy() {
    if (this.statusesChanged.length > 0) {
      this.statusesChanged.forEach((el) => {
        this.orders.forEach((order) => {
          if (el.id == order.id && el.status == order.status) {
            this.newStatuses.push(el);
          }
        });
      });
      const subscription = this.orderService
        .updateStatuses(this.newStatuses)
        .subscribe((res) => {
          this.loadingService.removeSubscription(subscription);
        });
      this.loadingService.addSubscription(subscription);
    }
  }

  loadCars() {
    const subscription = this.orderService.find<OrderEntity>().subscribe((orders) => {
      this.allOrders = orders;
      this.showOrders(1);
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  modalOpen(order: OrderEntity) {
    const modal = this.ms.open(CarOrderComponent, {
      centered: true,
      size: 'xl',
    });
    console.log(order);
    modal.componentInstance.order = order;
    modal.componentInstance.car = order.car;
    modal.result.then((res) => {
      this.loadCars();
    });
  }

  changeStatus(order: OrderEntity) {
    // const today = this.calendar.getToday();
    // const isForsib = this.forciblyStatuses.get('statusCheck').value;
    // if (isForsib) {
    //   switch (order.status) {
    //     case OrderStatus.Planned:
    //       order.status = OrderStatus.Active;
    //       this.statusesChanged.push({ id: order.id, status: order.status });
    //       break;
    //     case OrderStatus.Active:
    //       order.status = OrderStatus.Complete;
    //       this.statusesChanged.push({ id: order.id, status: order.status });
    //       break;
    //     case OrderStatus.Complete:
    //       order.status = OrderStatus.Canceled;
    //       this.statusesChanged.push({ id: order.id, status: order.status });
    //       break;
    //     case OrderStatus.Canceled:
    //       order.status = OrderStatus.Planned;
    //       this.statusesChanged.push({ id: order.id, status: order.status });
    //       break;
    //   }
    // } else {
    //   switch (order.status) {
    //     case OrderStatus.Planned:
    //       if (
    //         (today.after(order.dateFrom as NgbDate) &&
    //           today.before(order.dateTo as NgbDate)) ||
    //         today.equals(order.dateFrom as NgbDate)
    //       ) {
    //         order.status = OrderStatus.Active;
    //         this.statusesChanged.push({ id: order.id, status: order.status });
    //       }
    //       break;
    //     case OrderStatus.Active:
    //       if (
    //         (today.after(order.dateFrom as NgbDate) &&
    //           today.after(order.dateTo as NgbDate)) ||
    //         today.equals(order.dateTo as NgbDate) ||
    //         (!order.dateTo && today.equals(order.dateFrom as NgbDate))
    //       ) {
    //         order.status = OrderStatus.Complete;
    //         this.statusesChanged.push({ id: order.id, status: order.status });
    //       }
    //       break;
    //     case OrderStatus.Canceled:
    //       if (
    //         (today.before(order.dateFrom as NgbDate) &&
    //           today.before(order.dateTo as NgbDate)) ||
    //         today.equals(order.dateTo as NgbDate)
    //       ) {
    //         order.status = OrderStatus.Planned;
    //         this.statusesChanged.push({ id: order.id, status: order.status });
    //       }
    //       if (
    //         (today.after(order.dateFrom as NgbDate) &&
    //           today.before(order.dateTo as NgbDate)) ||
    //         today.equals(order.dateFrom as NgbDate)
    //       ) {
    //         order.status = OrderStatus.Active;
    //         this.statusesChanged.push({ id: order.id, status: order.status });
    //       }
    //       break;
    //   }
    // }
  }

  showOrders(status: number) {
    this.statuses = status;
    this.orders = [];
    this.allOrders.forEach((order) => {
      if (parseInt(order.status) == status) {
        this.orders.push(order);
      }
    });
  }

  public ngbDateToString(date: NgbDate): string {
    if (!date) {
      return null;
    }
    const newDate = new Date(date.year, date.month - 1, date.day);
    const [year, month, day] = [
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      newDate.getDate(),
    ];
    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${
      year < 10 ? `0${year}` : year
    }`;
  }

  public ngbTimeToString(time: NgbTimeStruct): string {
    return `${time.hour < 10 ? `0${time.hour}` : time.hour}:${
      time.minute < 10 ? `0${time.minute}` : time.minute
    }`;
  }
}
