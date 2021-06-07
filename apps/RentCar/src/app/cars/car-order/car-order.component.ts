import { Component, OnInit, Input, Output } from '@angular/core';
import {
  NgbActiveModal,
  NgbCalendar,
  NgbDate,
  NgbTimeStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CarEntity } from '@rent/interfaces/modules/car/entities/car.entity';
import { OrderEntity } from '@rent/interfaces/modules/order/entities/order.entity';
import { PlaceEntity } from '@rent/interfaces/modules/order/entities/place.entity';
import { UserEntity } from '@rent/interfaces/modules/security/entities/user.entity';
import { LoadingService } from '@rent/web/_services/loading.service';
import { AuthService } from '@rent/web/_services/auth.service';
import { PlaceService } from '@rent/web/_services/place.service';
import { UserService } from '@rent/web/_services/user.service';
import { OrderService } from '@rent/web/_services/order.service';
import { AuthModalComponent } from '@rent/web/profile/auth-modal/auth-modal.component';

@Component({
  selector: 'car-order',
  templateUrl: './car-order.component.html',
  styleUrls: ['./car-order.component.less'],
})
export class CarOrderComponent implements OnInit {
  @Input() car: CarEntity;
  @Input() carInfoOpen = false;
  @Input() order: OrderEntity;
  user: UserEntity;
  time: NgbTimeStruct;
  minTime: NgbTimeStruct;
  places: PlaceEntity[];
  // dates: CarDates[];
  hoveredDate: NgbDate | null = null;
  minDate: NgbDate;
  maxDate: NgbDate;
  isMinTime: boolean = false;
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
  constructor(
    private calendar: NgbCalendar,
    private activeModal: NgbActiveModal,
    private loadingService: LoadingService,
    private placeService: PlaceService,
    private orderService: OrderService,
    private userService: UserService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ms: NgbModal
  ) {
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
            toDate: null,
          },
          [Validators.required],
        ],
        place: [null, Validators.required],
        deliveryTime: [{ hour: 12, minute: 0, second: 0 }, Validators.required],
        carId: null,
        sum: null,
      }),
    });
  }

  ngOnInit() {
    const subscription = this.placeService.find<PlaceEntity>().subscribe(
      (places) => {
        this.places = places;

        if (this.fromDate.equals(this.calendar.getToday())) this.setMinTime();

        if (this.order) {
          this.orderForm
            .get('order')
            .get('period')
            .setValue({
              fromDate: this.order.dateFrom,
              toDate: this.order.dateTo,
            });
          this.orderForm
            .get('order')
            .get('deliveryTime')
            .setValue(this.order.time);
          this.time = this.order.time as NgbTimeStruct;
          this.orderForm.get('order').get('place').setValue(this.order.place.id);
        }
        // this.setMaxDate(this.fromDate);
        // if (user) {
        //   if (isAdmin && this.order) this.user = this.order.user;
        //   else this.user = user;
        //   const userForm = this.orderForm.get('user') as FormGroup;
        //   userForm.patchValue(this.user);
        //   userForm.disable();
        // }
        this.loadingService.removeSubscription(subscription);
      }
    );
    this.loadingService.addSubscription(subscription);

    this.period = this.orderForm.get('order').get('period') as FormControl;

    this.orderForm.get('order').valueChanges.subscribe((value) => {
      if (
        value.deliveryTime &&
        this.time &&
        this.fromDate.equals(this.calendar.getToday())
      ) {
        if (
          value.deliveryTime.hour < this.minTime.hour ||
          (value.deliveryTime.hour == this.minTime.hour &&
            value.deliveryTime.minute < this.minTime.minute)
        ) {
          this.isMinTime = true;
        } else {
          this.isMinTime = false;
        }
      }
      if (this.places) {
        this.places.forEach((place) => {
          if (place.id == this.orderForm.get('order').get('place').value)
            this.currentPlace = place.name;
        });
      }
      if (this.toDate && this.fromDate) {
        this.rangeDays =
          (new Date(
            this.toDate.year,
            this.toDate.month,
            this.toDate.day
          ).getTime() -
            new Date(
              this.fromDate.year,
              this.fromDate.month,
              this.fromDate.day
            ).getTime()) /
            (24 * 3600000) +
          1;
      } else if (this.fromDate) {
        this.rangeDays = 1;
      }
    });
  }

  close() {
    this.activeModal.close();
  }

  enter() {
    const modal = this.ms.open(AuthModalComponent, {
      centered: true,
      size: 'xl',
    });
    modal.result.then((res) => {
      this.user = res;
      const userForm = this.orderForm.get('user') as FormGroup;
      userForm.patchValue(this.user);
      userForm.disable();
    });
  }

  addOrder() {
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
    if (this.isMinTime) {
      this.orderForm.markAsDirty();
      return;
    }
    const orderFormValue = orderForm.getRawValue();
    // let order: OrderEntity = {
    //   carId: this.car.id,
    //   placeId: orderFormValue.place,
    //   dateFrom: orderFormValue.period.fromDate,
    //   dateTo: orderFormValue.period.toDate,
    //   time: orderFormValue.deliveryTime,
    //   orderSum: this.car.price * this.rangeDays,
    // };
    let order = new OrderEntity();

    if (this.order) {
      order.id = this.order.id;
      const subscription = this.orderService.update<OrderEntity>(order).subscribe(order => {
        this.loadingService.removeSubscription(subscription);
      });
      this.loadingService.addSubscription(subscription);
    } else {
      const subscription = this.orderService.create(order).subscribe(order => {
        this.loadingService.removeSubscription(subscription);
        this.router.navigate(['/profile']);
        this.activeModal.close();
      });
      this.loadingService.addSubscription(subscription);
    }
  }

  removeOrder() {
    const subscription = this.orderService.deleteById(this.order.id).subscribe(order => {
      this.loadingService.removeSubscription(subscription);
      this.activeModal.close();
    });
    this.loadingService.addSubscription(subscription);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      // this.setMaxDate(date);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.setMinTime();
      this.toDate = date;
      this.maxDate = null;
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.setMinTime();
      // this.setMaxDate(date);
    }
    if (!this.fromDate.equals(this.calendar.getToday()))
      this.orderForm
        .get('order')
        .get('deliveryTime')
        .setValue({ hour: 12, minute: 0, second: 0 });
  }

  // setMaxDate(date: NgbDate) {
  //   if (!this.dates) {
  //     this.maxDate = null;
  //     return;
  //   }
  //   const maxDate = this.dates.filter((range: CarDates) =>
  //     (range.dateFrom as NgbDate).after(date)
  //   )[0];
  //   if (maxDate) {
  //     this.maxDate = maxDate.dateFrom as NgbDate;
  //   } else {
  //     this.maxDate = null;
  //   }
  // }

  setMinTime() {
    if (new Date().getMinutes() > 30) {
      this.time = { hour: new Date().getHours() + 2, minute: 0, second: 0 };
      this.minTime = this.time;
    }
    if (new Date().getMinutes() < 30) {
      this.time = { hour: new Date().getHours() + 1, minute: 30, second: 0 };
      this.minTime = this.time;
    }
    if (new Date().getMinutes() == 30) {
      this.time = { hour: new Date().getHours() + 1, minute: 30, second: 0 };
      this.minTime = this.time;
    }
    this.orderForm.get('order').get('deliveryTime').setValue(this.time);
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  isDisabled = (date: NgbDate) => {
    if (date.before(this.minDate)) {
      return true;
    }
    if (date.after(this.maxDate)) {
      return true;
    }
    // if (this.dates) {
    //   for (let range of this.dates) {
    //     if (
    //       date.equals(range.dateFrom as NgbDate) ||
    //       date.equals(range.dateTo as NgbDate)
    //     ) {
    //       return true;
    //     }

    //     if (!range.dateTo) {
    //       continue;
    //     }

    //     if (
    //       date.after(range.dateFrom as NgbDate) &&
    //       date.before(range.dateTo as NgbDate)
    //     ) {
    //       return true;
    //     }
    //   }
    // }
  };
}
