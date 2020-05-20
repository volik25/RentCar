import { Component, OnInit, Input, Output } from '@angular/core';
import { Car } from 'src/app/models/car';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbTimeStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Place } from 'src/app/models/place';
import { LoadingService } from 'src/app/services/loading.service';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { SignInComponent } from 'src/app/profile/sign-in/sign-in.component';
import { AuthModalComponent } from 'src/app/profile/auth-modal/auth-modal.component';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'car-order',
  templateUrl: './car-order.component.html',
  styleUrls: ['./car-order.component.less']
})
export class CarOrderComponent implements OnInit {
  @Input() car: Car;
  @Input() carInfoOpen = false;
  //@Output() data: EventEmitter<any> = new EventEmitter<any>();
  user: User;
  time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  places: Place[];
  hoveredDate: NgbDate | null = null;
  minDate: NgbDate;
  period: FormControl;
  currentPlace: string;

  public get fromDate(): NgbDate {
    return this.period.value.fromDate;
  }

  public get toDate(): NgbDate | null {
    return this.period.value.toDate;
  }

  public set fromDate(date: NgbDate) {
    this.period.setValue({
      fromDate: date,
      toDate: this.toDate,
    });
  }

  public set toDate(date: NgbDate) {
    this.period.setValue({
      fromDate: this.fromDate,
      toDate: date,
    });
  }

  public rangeDays: number;
  public orderForm: FormGroup;
  constructor(private calendar: NgbCalendar, private activeModal: NgbActiveModal,
    private loadingService: LoadingService, private api: ApiService,
    private fb: FormBuilder, private auth: AuthService,
    private router: Router, private ms: NgbModal) {
      this.orderForm = this.fb.group({
        user: this.fb.group({
          name: [null, Validators.required],
          surname: [null, Validators.required],
          secondname: null,
          email: [null, [Validators.required, Validators.email]],
          phone: [null, Validators.required],
        }),
        order: this.fb.group({
          period: [
            {
              fromDate: this.calendar.getToday(),
              toDate: this.calendar.getNext(this.calendar.getToday(), 'd', 2),
            },[Validators.required]
          ],
          place: [null, Validators.required],
          time: null,
          carId: null,
          sum: null,
        }),
      });
  }

  ngOnInit() {
    const requests = [this.api.getPlaces()];
    if (this.auth.getToken()) {
      requests.push(this.api.getUser());
    }
    //const orderDetailForm = this.orderForm.get('order') as FormGroup;

    const subscription = forkJoin(requests).subscribe(([places, user]) => {
      this.places = places;
      this.fromDate = this.calendar.getToday();
      this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 2);
      this.minDate = this.fromDate;
      if (user) {
        this.user = user;
        const userForm = this.orderForm.get('user') as FormGroup;
        userForm.patchValue(this.user);
        userForm.disable();
      }
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
    this.period = this.orderForm.get('order').get('period') as FormControl;
    this.orderForm.get('order').get('time').setValue(this.time);

    this.orderForm.get('order').valueChanges.subscribe((value) => {
      if (this.places) {
        this.places.forEach(place => {
          if (place.id == this.orderForm.get('order').get('place').value) this.currentPlace = place.name
        });
      }
      if (this.toDate && this.fromDate) {
        this.rangeDays = (new Date(this.toDate.year, this.toDate.month, this.toDate.day).getTime() - new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day).getTime()) / (24 * 3600000) + 1;
      }
      else if (this.fromDate) {
        this.rangeDays = 1;
      }
    });
  }

  close(){
    this.activeModal.close();
  }

  enter(){
    const modal = this.ms.open(AuthModalComponent, {centered: true, size: 'xl'});
      modal.result.then((res)=>{
        this.user = res;
        const userForm = this.orderForm.get('user') as FormGroup;
        userForm.patchValue(this.user);
        userForm.disable();
      });
  }

  addOrder(){
    //this.submitted = true;
    const orderForm = this.orderForm.get('order') as FormGroup;
    if (orderForm.invalid) {
      for (const control of Object.values(orderForm.controls)) {
        if (control.invalid) {
          control.markAsDirty();
        }
      }
      return;
    }
    if (!this.period.value.fromDate) {
      this.orderForm.markAsDirty();
      return;
    }
    const orderFormValue = orderForm.getRawValue();
    const order: Order = {
      carId: this.car.id,
      placeId: orderFormValue.place,
      dateFrom: orderFormValue.period.fromDate,
      dateTo: orderFormValue.period.toDate,
      time: orderFormValue.time,
      orderSum: this.car.price * this.rangeDays,
    };

    const subscription = this.api.addOrder(order).subscribe((v) => {
      this.loadingService.removeSubscription(subscription);
      this.router.navigate(['/profile']);
      this.activeModal.close();
    });
    this.loadingService.addSubscription(subscription);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  isDisabled = (date: NgbDate) => {
    if (date.before(this.minDate)) {
      return true;
    }
  }
}
