import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/car';
import { CarOrderComponent } from '../car-order/car-order.component';

@Component({
  selector: 'car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.less']
})
export class CarInfoComponent implements OnInit {
  @Input() car: Car;
  constructor(private activeModal: NgbActiveModal, private ms: NgbModal) { }

  ngOnInit() {
  }

  close(){
    this.activeModal.close();
  }

  order(){
    const modal = this.ms.open(CarOrderComponent, {centered: true, size: 'lg'});
      modal.componentInstance.car = this.car;
      modal.result.then((res)=>{
        this.activeModal.close();
      });
  }

}
