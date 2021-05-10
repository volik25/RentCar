import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/internal/operators';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less']
})
export class MainMenuComponent implements OnInit, OnDestroy {
  public showMenu: boolean = false;
  public user: User;
  private rxAlive: boolean = true;
  constructor(private api: ApiService, private loadingService: LoadingService, private auth: AuthService) {}

  ngOnInit(): void {
    this.getUser();

    this.auth.$userUpdate.pipe(takeWhile(() => this.rxAlive)).subscribe(() => {
      this.getUser();
    });
  }

  ngOnDestroy() {
    this.rxAlive = false;
  }

  getUser() {
    this.user = null;
    if (this.auth.getToken()) {
      const subscription = this.api.getUser().subscribe((user) => {
        this.user = user;
        this.loadingService.removeSubscription(subscription);
      });
      this.loadingService.addSubscription(subscription);
    }
  }
}