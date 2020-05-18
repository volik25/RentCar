import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCarComponent } from './edit-car/edit-car.component';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.less']
})
export class AdminCarsComponent implements OnInit {
  cars:Car[];
  closeResult: string;
  carsLength;
  public page = 1;
  public pageSize = 9;
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
  
  removeCar(id, img){
    const subscription = this.api.removeCar({carId: id, filelink: img}).subscribe(() => {
      this.loadCars();
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  modalOpen(param, carId = null){
    const modal = this.mS.open(EditCarComponent, {centered: true, size: 'xl', });
    switch (param) {
      case 'add':
        modal.result.then((res)=>{
          this.closeResult = res;
          this.loadCars();
        });
        break;
      case 'edit':
        modal.componentInstance.carId = carId;
        modal.result.then((res)=>{
          this.closeResult = res;
          this.loadCars();
        });
        break;
      default:
        break;
    }
  }
}
