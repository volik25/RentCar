import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Order } from 'src/app/models/order';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {
  public orders: Order[];
  public page = 1;
  public pageSize = 9;
  constructor(private api: ApiService, private loadingService: LoadingService) { }

  ngOnInit() {
    const subscription = this.api.getOrders().subscribe(orders => {
      this.orders = orders;
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }

  modalOpen(param, order){

  }

  removeOrder(orderId){

  }
}
