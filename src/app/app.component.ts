import { Component, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { element } from 'protractor';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { notFoundService } from './services/notFound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('scrollbar') scrollbar: ElementRef<HTMLDivElement>;
  @ViewChild('thumb') thumb: ElementRef<HTMLDivElement>;
  element = document.querySelector('body');
  title = 'RentCar';
  notFound: boolean;
  percentScrolled = 0;
  private isMouseDown = new BehaviorSubject(false);
  private isMouseOut = new BehaviorSubject(true);

  constructor(public loadingService: LoadingService,
              private cdRef: ChangeDetectorRef,
              public nf: notFoundService) {

    loadingService.changeDetectorRef = cdRef;

    nf.getNotFound().subscribe(notFound => {
      this.notFound = notFound;
    });

    window.addEventListener('scroll', () => {
      let needToScroll = this.element.scrollHeight - window.innerHeight;
      this.percentScrolled = pageYOffset/needToScroll*100;
    });

    // pageYOffset - скролл
    // window.innerHeight - размер окна
    // element.scrollHeight - высота страницы
  }

  ngAfterViewInit(){
    this.scrollbar.nativeElement.addEventListener('mousedown', (event) => {
      let scrollPercent = event.pageX/window.innerWidth;
      let scrolled = this.element.scrollHeight*scrollPercent;
      scrollTo(0, parseInt(scrolled.toFixed(0)));
    });

    this.thumb.nativeElement.addEventListener('mousedown', (event) => {
      event.stopPropagation();
      this.isMouseDown.next(true);
      this.isMouseOut.next(false);
    })

    this.thumb.nativeElement.addEventListener('mouseup', (event) => {
      event.stopPropagation();
      this.isMouseDown.next(false);
    })

    this.thumb.nativeElement.addEventListener('mousemove', (event) => {
      event.stopPropagation();
      this.getMouseDown().subscribe(isMouseDown => {
        this.getMouseOut().subscribe(isMouseOut => {
          if (isMouseDown && !isMouseOut) {
            let scrollPercent = event.pageX/window.innerWidth;
            let scrolled = this.element.scrollHeight*scrollPercent;
            scrollTo(0, parseInt(scrolled.toFixed(0)));
          }
        })
      })
    })

    this.thumb.nativeElement.addEventListener('mouseout', (event) => {
      event.stopPropagation();
      this.isMouseOut.next(true);
    })
  }

  setMouseDown(value): void {
    this.isMouseDown.next(value);
  };

  getMouseDown(): Observable<boolean>{
      return this.isMouseDown;
  }

  setMouseOut(value): void {
    this.isMouseOut.next(value);
  };

  getMouseOut(): Observable<boolean>{
      return this.isMouseOut;
  }
}
