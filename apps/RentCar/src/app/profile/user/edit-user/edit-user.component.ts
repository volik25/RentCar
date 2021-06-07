import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserEntity } from '@rent/interfaces/modules/security/entities/user.entity';
import { LoadingService } from '@rent/web/_services/loading.service';
import { UserService } from '@rent/web/_services/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less'],
})
export class EditUserComponent implements OnInit {
  public user: UserEntity;
  public userForm: FormGroup;
  public showError = false;
  public passwordVerify = true;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loadingService: LoadingService,
    private activeModal: NgbActiveModal
  ) {
    this.userForm = this.fb.group({
      surname: [null, Validators.required],
      name: [null, Validators.required],
      secondname: null,
      email: [null, [Validators.required, Validators.email]],
      phone: null,
      password: null,
      passwordVerify: null,
    });
    this.userForm.get('passwordVerify').valueChanges.subscribe((value) => {
      let password = this.userForm.get('password').value;
      if (value != password) {
        this.passwordVerify = false;
      } else {
        this.passwordVerify = true;
      }
    });
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    // const subscription = this.api.getUser().subscribe((user) => {
    //   this.user = user;
    //   this.userForm.patchValue(this.user);
    //   this.loadingService.removeSubscription(subscription);
    // });
    // this.loadingService.addSubscription(subscription);
  }

  save() {
    const newData = this.userForm.getRawValue();
    delete newData.passwordVerify;
    if (newData.password) {
      if (!this.passwordVerify) {
        return;
      }
    } else {
      delete newData.password;
    }
    const subscription = this.userService.update<UserEntity>(newData).subscribe((data) => {
      console.log(data);
      this.activeModal.close();
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  close() {
    this.activeModal.close();
  }
}
