import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private token: string;
  private readonly KEY = 'rentCar.user.token';
  public redirectUrl: string = '/profile';
  public $userUpdate: Subject<boolean> = new Subject();

  constructor() {
    this.token = sessionStorage.getItem('rentCar.user.token');
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
