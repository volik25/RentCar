import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'RentCar';
  constructor(public loadingService: LoadingService, private cdRef: ChangeDetectorRef) {
    loadingService.changeDetectorRef = cdRef;
  }
}
