import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'prog-scroll',
  templateUrl: './prog-scroll.component.html',
  styleUrls: ['./prog-scroll.component.less']
})
export class ProgScrollComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollbar') scrollbar: ElementRef<HTMLDivElement>;
  @ViewChild('thumb') thumb: ElementRef<HTMLDivElement>;

  @Input() scrollColor: any;
  @Input() thumbColor: any;

  public element = document.querySelector('body');
  percentScrolled = 0;
  private isMouseDown = new BehaviorSubject(false);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    
    window.addEventListener('scroll', () => {
      let needToScroll = this.element.scrollHeight - window.innerHeight;
      this.percentScrolled = pageYOffset/needToScroll*100;
    });
    
    this.scrollbar.nativeElement.style.backgroundColor = this.scrollColor;
    this.thumb.nativeElement.style.backgroundColor = this.thumbColor;

    this.scrollbar.nativeElement.addEventListener('mousedown', () => {
      this.isMouseDown.next(true);
    });

    this.thumb.nativeElement.addEventListener('mousedown', (event) => {
      event.stopPropagation();
      this.isMouseDown.next(true);
    })

    document.addEventListener('mouseup', () => {
      this.isMouseDown.next(false);
    })

    document.addEventListener('mousemove', (event) => {
      this.getMouseDown().subscribe(isMouseDown => {
        if (isMouseDown) {
          window.getSelection().removeAllRanges();
          let scrolled = ((this.element.scrollHeight - window.innerHeight)*event.pageX)/this.scrollbar.nativeElement.scrollWidth;
          scrollTo(0, parseInt(scrolled.toFixed(0)));
        }
      })
    })
  }

  setMouseDown(value): void {
    this.isMouseDown.next(value);
  };

  getMouseDown(): Observable<boolean>{
      return this.isMouseDown;
  }
}
