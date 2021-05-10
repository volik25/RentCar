import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from './_services/loading.service';
import { notFoundService } from './_services/notFound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent{
  title = 'RentCar';
  notFound: boolean;

  constructor(public loadingService: LoadingService,
              private cdRef: ChangeDetectorRef,
              public notFoundService: notFoundService) {
    loadingService.changeDetectorRef = cdRef;
    notFoundService.getNotFound().subscribe(notFound => {
      this.notFound = notFound;
    });
  }
}
