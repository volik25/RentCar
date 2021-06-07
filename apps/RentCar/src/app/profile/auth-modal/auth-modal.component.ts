import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '@rent/web/_services/loading.service';
import { UserService } from '@rent/web/_services/user.service';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.less'],
})
export class AuthModalComponent implements OnInit {
  onDisplay = 'sign-in';
  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {}

  close() {
    // const subscription = this.userService.findById().subscribe((user) => {
    //   this.activeModal.close(user);
    //   this.loadingService.removeSubscription(subscription);
    // });
    // this.loadingService.addSubscription(subscription);
  }

  changeForm(form: string) {
    this.onDisplay = form;
  }
}
