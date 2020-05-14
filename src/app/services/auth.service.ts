import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private token: string;
  private readonly KEY = 'bookingUserToken';
  public redirectUrl: string = '/profile';
  public $userUpdate: Subject<boolean> = new Subject();

  constructor() {
    this.token = sessionStorage.getItem('bookingUserToken');
  }

  public setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem(this.KEY, token);
    if (token) {
      this.$userUpdate.next(true);
    }
  }

  public getToken(): string {
    return this.token;
  }

  public exit() {
    this.token = null;
    sessionStorage.removeItem(this.KEY);
    this.$userUpdate.next(false);
  }

  public setDefaultUrl() {
    this.redirectUrl = '/profile';
  }
}
