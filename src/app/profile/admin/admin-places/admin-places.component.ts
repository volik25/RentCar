import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'admin-places',
  templateUrl: './admin-places.component.html',
  styleUrls: ['./admin-places.component.less']
})
export class AdminPlacesComponent implements OnInit {

  public addForm: FormGroup;
  public places: Place[];
  public place: Place;
  public page = 1;
  public pageSize = 5;
  constructor(private fb: FormBuilder, private api: ApiService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.initForm();
  }

  public initForm(){
    this.place = null
    this.api.getPlaces().subscribe(places => {
      this.places = places;
    })
    this.addForm = this.fb.group({
      name:[null, Validators.required]
    })
  }

  public setForm(id){
    this.place = this.places.find(x => x.id == id);
    this.addForm.patchValue(this.place);
  }

  public save(){
    const newPlace = this.addForm.getRawValue();
    if (this.place) {
      newPlace.id = this.place.id;
      const subscription = this.api.updatePlace(newPlace).subscribe(() => {
        this.initForm();
        this.loadingService.removeSubscription(subscription);
      });
      this.loadingService.addSubscription(subscription);
    }
    else{
      const subscription = this.api.addPlace(newPlace).subscribe(() => {
        this.initForm();
        this.loadingService.removeSubscription(subscription);
      });
      this.loadingService.addSubscription(subscription);
    }
  };

  public clear(){
    this.place = null;
    this.addForm = this.fb.group({
      name:[null, Validators.required]
    })
  }

  public remove(){
    const subscription = this.api.deletePlace(this.place.id).subscribe(() => {
      this.initForm();
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  get f() { return this.addForm.controls; }
}
