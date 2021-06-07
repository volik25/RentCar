import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '@rent/web/_services/car.service';
import { LoadingService } from '@rent/web/_services/loading.service';
import { CarEntity } from '@rent/interfaces/modules/car/entities/car.entity';

@Component({
  selector: 'edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.less'],
})
export class EditCarComponent implements OnInit {
  @Input() car;
  public subs: Subscription = new Subscription();
  public carForm: FormGroup;
  // public bodyTypes = bodyOptions;
  // public fuelTypes = fuelOptions;
  // public kppTypes = kppOptions;
  // public acTypes = acOptions;
  // public wdTypes = wdOptions;
  // public steeringTypes = steeringOptions;
  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private loadingService: LoadingService,
    private router: Router,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.initForm();
    if (this.car) {
      this.updateCar(this.car);
    }
  }

  private initForm() {
    this.carForm = this.fb.group({
      name: [null, Validators.required],
      img: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      bodyType: [null, Validators.required],
      fuelType: [null, Validators.required],
      fuelCity: [null],
      fuelTrack: [null],
      enginePower: [null],
      engineVolume: [null],
      maxSpeed: [null],
      accelerationTime: [null],
      kpp: [null, Validators.required],
      gears: [null],
      wheelDrive: [null],
      doors: [null, Validators.required],
      sits: [null, Validators.required],
      hasAirbags: [false],
      airbags: [null],
      AC: [null, Validators.required],
      steering: [null, Validators.required],
      trunkVolume: [null],
      createYear: [null],
    });
  }

  public saveCar() {
    if (this.carForm.invalid) {
      for (const control of Object.values(this.carForm.controls)) {
        if (control.invalid) {
          control.markAsDirty();
        }
      }
      return;
    }
    const newCar = this.carForm.getRawValue();
    delete newCar.hasAirbags;
    this.subs = this.uploadImg(newCar.img).subscribe((data) => {
      console.log(data);
      newCar.img = data;
      if (this.car) {
        newCar.id = this.car.id;
        newCar.oldImg = this.car.img;
        const subscription = this.carService.update<CarEntity>(newCar).subscribe(() => {
          this.updateCar(this.car.id);
          this.loadingService.removeSubscription(subscription);
        });
        this.loadingService.addSubscription(subscription);
      } else {
        const subscription = this.carService.create<CarService>(newCar).subscribe((carId) => {
          this.loadingService.removeSubscription(subscription);
          this.activeModal.close(carId);
        });
        this.loadingService.addSubscription(subscription);
      }
      this.loadingService.removeSubscription(this.subs);
    });
    this.loadingService.addSubscription(this.subs);
  }

  updateCar(car) {
    this.carForm.patchValue(car);
    if (car.airbags) {
      this.carForm.get('hasAirbags').setValue(true);
    }
  }

  uploadImg(img): Observable<string> {
    if (img instanceof File) {
      const formData = new FormData();
      formData.append('CarImage', img, img.name.replace(' ', '_'));
      formData.append('path', 'cars');
      // return this.api.uploadImg(formData);
    } else {
      return of(img);
    }
  }

  removeImg() {
    this.carForm.get('img').setValue(null);
  }

  isUploadFileShown() {
    const value = this.carForm.get('img').value;

    return !value || value instanceof File;
  }

  close() {
    this.activeModal.close();
  }
}
