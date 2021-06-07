import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarEntity } from '@rent/interfaces/modules/car/entities/car.entity';
import { CarService } from '@rent/web/_services/car.service';
import { LoadingService } from '@rent/web/_services/loading.service';
import { EditCarComponent } from './edit-car/edit-car.component';

@Component({
  selector: 'admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.less'],
})
export class AdminCarsComponent implements OnInit {
  cars: CarEntity[];
  closeResult: string;
  carsLength;
  public page = 1;
  public pageSize = 9;
  constructor(
    private carService: CarService,
    private loadingService: LoadingService,
    private mS: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    const subscription = this.carService.find<CarEntity>().subscribe((cars) => {
      this.cars = cars;
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  removeCar(id, img) {
    const subscription = this.carService
      .deleteById(id)
      .subscribe(() => {
        this.loadCars();
        this.loadingService.removeSubscription(subscription);
      });
    this.loadingService.addSubscription(subscription);
  }

  modalOpen(param, car = null) {
    const modal = this.mS.open(EditCarComponent, {
      centered: true,
      size: 'lg',
    });
    switch (param) {
      case 'add':
        modal.result.then((res) => {
          this.closeResult = res;
          this.loadCars();
        });
        break;
      case 'edit':
        modal.componentInstance.car = car;
        modal.result.then((res) => {
          this.closeResult = res;
          this.loadCars();
        });
        break;
      default:
        break;
    }
  }
}
