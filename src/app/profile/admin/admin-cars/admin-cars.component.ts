import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCarComponent } from './edit-car/edit-car.component';

@Component({
  selector: 'admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.less']
})
export class AdminCarsComponent implements OnInit {
  cars;
  closeResult: string;
  constructor(private api: ApiService, private loadingService: LoadingService, private mS: NgbModal) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(){
    const subscription = this.api.getCars().subscribe(cars => {
      this.cars = cars;
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }
  modalOpen(){
    this.mS.open(EditCarComponent, {centered: true, size: 'xl'}).result.then((res)=>{
      this.closeResult = res;
      this.loadCars();
    });
  }
}
