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
  percentScrolled = 0;
  constructor(public loadingService: LoadingService,
              private cdRef: ChangeDetectorRef,
              public nf: notFoundService) {

    loadingService.changeDetectorRef = cdRef;

    nf.getNotFound().subscribe(notFound => {
      this.notFound = notFound;
    });

    const element = document.querySelector('body');

    window.addEventListener('scroll', () => {
      let needToScroll = element.scrollHeight - window.innerHeight;
      this.percentScrolled = pageYOffset/needToScroll*100;
    });

    // pageYOffset - скролл
    // window.innerHeight - размер окна
    // element.scrollHeight - высота страницы

  }
}
