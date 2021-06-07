import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminSecurity implements CanActivate {
  constructor(
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let token = sessionStorage.getItem('bookingUserToken');
    // if (token) {
    //   return this.api.checkAccess().pipe(
    //     tap((isAdmin) => {
    //       if (!isAdmin) {
    //         this.router.navigate(['/profile']);
    //       }
    //     })
    //   );
    // }
    this.router.navigate(['/sign-in']);
    return false;
  }
}
