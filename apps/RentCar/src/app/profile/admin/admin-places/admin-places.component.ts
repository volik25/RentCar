import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceEntity } from '@rent/interfaces/modules/order/entities/place.entity';
import { LoadingService } from '@rent/web/_services/loading.service';
import { PlaceService } from '@rent/web/_services/place.service';

@Component({
  selector: 'admin-places',
  templateUrl: './admin-places.component.html',
  styleUrls: ['./admin-places.component.less'],
})
export class AdminPlacesComponent implements OnInit {
  public addForm: FormGroup;
  public places: PlaceEntity[];
  public place: PlaceEntity;
  public page = 1;
  public pageSize = 9;
  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.place = null;
    const sub = this.placeService.find<PlaceEntity>().subscribe((places) => {
      this.places = places;
      this.loadingService.removeSubscription(sub);
    });
    this.loadingService.addSubscription(sub);
    this.addForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  public setForm(id) {
    this.place = this.places.find((x) => x.id == id);
    this.addForm.patchValue(this.place);
  }

  public save() {
    const newPlace = this.addForm.getRawValue();
    if (this.place) {
      newPlace.id = this.place.id;
      const subscription = this.placeService.update<PlaceEntity>(newPlace).subscribe(() => {
        this.initForm();
        this.loadingService.removeSubscription(subscription);
      });
      this.loadingService.addSubscription(subscription);
    } else {
      const subscription = this.placeService.create<PlaceEntity>(newPlace).subscribe(() => {
        this.initForm();
        this.loadingService.removeSubscription(subscription);
      });
      this.loadingService.addSubscription(subscription);
    }
  }

  public clear() {
    this.place = null;
    this.addForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  public remove() {
    const subscription = this.placeService.deleteById(this.place.id).subscribe(() => {
      this.initForm();
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  get f() {
    return this.addForm.controls;
  }
}
