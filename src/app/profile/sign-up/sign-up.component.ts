import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  @Input() modal = false;
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDisplay: EventEmitter<any> = new EventEmitter<any>();
  public userForm: FormGroup;
  public showError: boolean;

  constructor(private fb: FormBuilder, private api: ApiService, private loadingService: LoadingService, private auth: AuthService, private router: Router) {
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
    const subscription = this.api.signUp(this.userForm.getRawValue()).subscribe((token) => {
      if (token) {
        this.auth.setToken(token);
        if (this.modal) {
          this.closed.emit();
        }
        else this.router.navigate([this.auth.redirectUrl]);
      } else {
        this.showError = true;
      }
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }
  
  changeForm(){
    this.onDisplay.emit('sign-in');
  }
}
