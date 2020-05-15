import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { takeWhile } from 'rxjs/internal/operators';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  tabs = [{ header: 'История заказов', link: 'orders'}];
  rxAlive: boolean = true;
  constructor(private api: ApiService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.api
      .checkAccess()
      .pipe(takeWhile(() => this.rxAlive))
      .subscribe((isAdmin) => {
        if (isAdmin) {
          this.tabs.push(
            { header: 'Автомобили', link: 'admin-cars'},
            { header: 'Места подачи', link: 'admin-places'}
          );
        }
      });
  }
  ngOnDestroy() {
    this.rxAlive = false;
  }

}
