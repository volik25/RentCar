import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@rent/web/_services/auth.service';
import { LoadingService } from '@rent/web/_services/loading.service';
import { UserService } from '@rent/web/_services/user.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit {
  @Input() modal = false;
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDisplay: EventEmitter<any> = new EventEmitter<any>();
  public userForm: FormGroup;
  public showError: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      secondname: null,
      email: [null, [Validators.required, Validators.email]],
      phone: null,
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  public onSignUpClick() {
    this.showError = false;
    if (this.userForm.invalid) {
      for (let value of Object.values(this.userForm.controls)) {
        if (value.invalid) {
          value.markAsDirty();
        }
      }
      return;
    }
    console.log(this.userForm.getRawValue());
    const subscription = this.userService
      .signUp(this.userForm.getRawValue())
      .subscribe((token) => {
        if (token) {
          this.auth.setToken(token);
          if (this.modal) {
            this.closed.emit();
          } else this.router.navigate([this.auth.redirectUrl]);
        } else {
          this.showError = true;
        }
        this.loadingService.removeSubscription(subscription);
      });
    this.loadingService.addSubscription(subscription);
  }

  changeForm() {
    this.onDisplay.emit('sign-in');
  }
}
