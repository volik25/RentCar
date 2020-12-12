import { Component, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { menuItems } from './models/menu';
import { ITheme } from './models/theme';
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
  public themes: ITheme[];
  public currentTheme: ITheme;
  public items: MenuItem[] = menuItems;
  constructor(public loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
    public nf: notFoundService) {
    this.themes = [
      {
        value: '1',
        label: 'Светлая'
      },
      {
        value: '2',
        label: 'Темная'
      }
    ];
    this.currentTheme = this.themes[0];
    loadingService.changeDetectorRef = cdRef;
    nf.getNotFound().subscribe(notFound => {
      this.notFound = notFound;
    });
  }
}
