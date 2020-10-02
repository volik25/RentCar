import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  cars: Car[];
  car: Car;
  carId: number;
  params: any;
  private routeSubscription: Subscription;
  private paramSubscription: Subscription;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private api: ApiService,
              public loadingService: LoadingService) {
                this.routeSubscription = route.params.subscribe(params => {
                  this.carId=params['id'];
                  this.params = JSON.parse(sessionStorage.getItem('queryParams'));
                  this.cars = JSON.parse(sessionStorage.getItem('cars'));
                  sessionStorage.removeItem('queryParams');
                  sessionStorage.removeItem('cars');
                });
              }

  ngOnInit() {
    const sub = this.api.getCar(this.carId).subscribe(car => {
      this.car = car;
      this.loadingService.removeSubscription(sub);
    })
    this.loadingService.addSubscription(sub);
  }

  goBack(){
    this.router.navigate(['/cars'], {queryParams: this.params});
  }
}
