import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BodyTypes } from 'src/app/models/enums';
import { bodyOptions, fuelOptions, kppOptions, acOptions, steeringOptions } from 'src/app/models/options';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Car } from 'src/app/models/car';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.less']
})

export class EditCarComponent implements OnInit {
  @Input() carId;
  car: Car;
  public carForm: FormGroup;
  public bodyTypes = bodyOptions;
  public fuelTypes = fuelOptions;
  public kppTypes = kppOptions;
  public acTypes = acOptions;
  public steeringTypes = steeringOptions;
  constructor(private fb: FormBuilder, private api: ApiService, 
              private loadingService: LoadingService,
              private router: Router, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.carForm = this.fb.group({
      name:[null, Validators.required],
      img:[null, Validators.required],
      description:[null, Validators.required],
      price:[null, Validators.required],
      bodyType:[null, Validators.required],
      fuelType:[null, Validators.required],
      fuelCity:[null],
      fuelTrack:[null],
      enginePower:[null],
      engineVolume:[null],
      maxSpeed:[null],
      accelerationTime:[null],
      kpp:[null, Validators.required],
      gears:[null],
      doors:[null, Validators.required],
      sits:[null, Validators.required],
      hasAirbags: [false],
      airbags:[null],
      AC:[null, Validators.required],
      steering:[null, Validators.required],
      trunkVolume:[null],
      createYear:[null]
    });

    if(this.carId){
      this.updateCar(this.carId);
    }
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
    const subs = this.uploadCarImg(newCar.img).subscribe((data) => {
      newCar.img = data;
      if (this.car) {
        newCar.id = this.car.id;
        newCar.oldImg = this.car.img;
        const subscription = this.api.updateCar(newCar).subscribe(() => {
          this.updateCar(this.car.id);
          this.loadingService.removeSubscription(subscription);
        });
        this.loadingService.addSubscription(subscription);
      } else {
        const subscription = this.api.addCar(newCar).subscribe((carId) => {
          console.log(carId);
          this.loadingService.removeSubscription(subscription);
          this.activeModal.close(carId);
        });
        this.loadingService.addSubscription(subscription);
      }
      this.loadingService.removeSubscription(subs);
    });
    this.loadingService.addSubscription(subs);
  }

  updateCar(id) {
    const subscription = this.api.getCar(id).subscribe((car) => {
      this.car = car;
      this.carForm.patchValue(car);
      if (car.airbags) {
        this.carForm.get('hasAirbags').setValue(true);
      }
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  removeCar(){
    const subscription = this.api.removeCar({carId: this.carId, filelink: this.car.img}).subscribe(() => {
      this.activeModal.close();
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  uploadCarImg(img): Observable<string> {
    if (img instanceof File) {
      const formData = new FormData();
      formData.append('CarImage', img, img.name.replace(' ', '_'));
      return this.api.uploadCarImg(formData);
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
}
