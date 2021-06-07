import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/internal/operators';
import { LoadingService } from '../_services/loading.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  tabs = [
    {
      header: 'Данные пользователя',
      link: 'user',
    },
    {
      header: 'История заказов',
      link: 'orders',
    },
  ];
  rxAlive: boolean = true;
  constructor(
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    // this.api
    //   .checkAccess()
    //   .pipe(takeWhile(() => this.rxAlive))
    //   .subscribe((isAdmin) => {
    //     if (isAdmin) {
    //       this.tabs.push(
    //         { header: 'Автомобили', link: 'admin-cars' },
    //         { header: 'Места подачи', link: 'admin-places' }
    //       );
    //     }
    //   });
  }
  ngOnDestroy() {
    this.rxAlive = false;
  }
}
