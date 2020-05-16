import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  public userInfo: User;
  constructor( private auth: AuthService, private router: Router, private api: ApiService, private loadingService: LoadingService,) {}

  public ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    const subscription = this.api.getUserInfo().subscribe((info) => {
      this.userInfo = info;
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  public exit() {
    this.auth.exit();
    this.router.navigate(['/sign-in']);
  }
}
