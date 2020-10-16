import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subscription } from 'rxjs';
import { Car } from 'src/app/models/car';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.less']
})
export class CarInfoComponent implements OnInit {
  order: boolean = false;
  rate: number;
  cars: Car[];
  car: Car;
  carId: number;
  params: any;
  private routeSubscription: Subscription;
  private paramSubscription: Subscription;
  constructor(public config: NgbRatingConfig,
              private route: ActivatedRoute,
              public router: Router,
              private api: ApiService,
              public loadingService: LoadingService) {
                config.max = 5;
                config.readonly = true;
                this.routeSubscription = route.params.subscribe(params => {
                  this.carId=params['id'];
                  this.params = JSON.parse(sessionStorage.getItem('queryParams'));
                  this.carAction(this.carId, 'remove');
                });
              }

  ngOnInit() {
    const request = [this.api.getCar(this.carId), this.api.getRating(this.carId)]
    const sub = forkJoin(request).subscribe(([car, rate]) => {
      this.car = car;
      if (rate) {
        this.rate = rate.toFixed(2);
      }
      this.loadingService.removeSubscription(sub);
    })
    this.loadingService.addSubscription(sub);
  }

  goBack(){
    this.router.navigate(['/cars'], {queryParams: this.params});
    sessionStorage.removeItem('queryParams');
    sessionStorage.removeItem('cars');
  }

  carAction(id, param){
    this.cars = JSON.parse(sessionStorage.getItem('cars'));
    if (this.cars.length > 5) {
      this.cars = this.cars.slice(0, 5);
    }
    let i = 0;
    this.cars.forEach(car => {
      if (car.id == id) {
        switch (param) {
          case 'update':
            const sub = this.api.getCar(id).subscribe(car => {
              this.car = car;
              this.carId = id;
              this.carAction(id, 'remove');
              this.loadingService.removeSubscription(sub);
            })
            this.loadingService.addSubscription(sub);
            break;
          case 'remove':
            this.cars.splice(i, 1);
            break;
          default:
            break;
        }
        return;
      }
      i++;
    })
  }
}
