import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  @Input() modal = false;
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDisplay: EventEmitter<any> = new EventEmitter<any>();
  public enterForm: FormGroup;
  public showError: boolean;
  public messageText;
  public errorCount = 0;
  constructor( private auth: AuthService, private api: ApiService,
              private loadingService: LoadingService, private router: Router,
              private fb: FormBuilder, private activeModal: NgbActiveModal) {
    this.enterForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public onEnterClick(): void {
    this.showError = false;
    if (this.enterForm.invalid) {
      for (let value of Object.values(this.enterForm.controls)) {
        if (value.invalid) {
          value.markAsDirty();
        }
      }
      return;
    }
    const subscription = this.api.signIn(this.enterForm.getRawValue()).subscribe(request => {
      let token = request['token'];
      if (token){
        this.auth.setToken(token);
        if (this.modal) {
          this.closed.emit();
        }
        else this.router.navigate([this.auth.redirectUrl]);
      }
      else{
        this.messageText = request['message'];
        this.showError = true;
        if (this.messageText == 'Неверный пароль') {
          this.errorCount++;
        }
      }
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  changeForm(){
    this.onDisplay.emit('sign-up');
  }

  changePassword(){
    let email = this.enterForm.getRawValue().email;
    this.api.changePassword(email).subscribe(request => {
      this.messageText = request['message'];
      this.showError = true;
    })
  }
}
