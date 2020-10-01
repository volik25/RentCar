import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { notFoundService } from './services/notFound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'RentCar';
  notFound: boolean;
  constructor(public loadingService: LoadingService, private cdRef: ChangeDetectorRef, public nf: notFoundService) {
    loadingService.changeDetectorRef = cdRef;
    nf.getNotFound().subscribe(notFound => {
      this.notFound = notFound;
    })
  }
}
