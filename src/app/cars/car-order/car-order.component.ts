import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/car';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'car-order',
  templateUrl: './car-order.component.html',
  styleUrls: ['./car-order.component.less']
})
export class CarOrderComponent implements OnInit {
  @Input() car: Car[];
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    
  }

}
