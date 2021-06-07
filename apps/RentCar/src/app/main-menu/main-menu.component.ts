import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserEntity } from '@rent/interfaces/modules/security/entities/user.entity';
import { takeWhile } from 'rxjs/internal/operators';
import { AuthService } from '../_services/auth.service';
import { LoadingService } from '../_services/loading.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less']
})
export class MainMenuComponent implements OnInit, OnDestroy {
  public showMenu: boolean = false;
  public user: UserEntity;
  private rxAlive: boolean = true;
  constructor(private userService: UserService, private loadingService: LoadingService, private auth: AuthService) {}

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
    // if (this.auth.getToken()) {
    //   const subscription = this.userService.findById(this.user).subscribe((user) => {
    //     this.user = user;
    //     this.loadingService.removeSubscription(subscription);
    //   });
    //   this.loadingService.addSubscription(subscription);
    // }
  }
}