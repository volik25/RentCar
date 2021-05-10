import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../_services/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(req: HttpRequest<{}>, next: HttpHandler): Observable<HttpEvent<{}>> {
    let params = req;
    if (sessionStorage.getItem('rentCar.user.token')) {
      let token = sessionStorage.getItem('rentCar.user.token');
      const paramReq = req.clone({
        params: req.params.set('token', token),
      });
      params = paramReq;
    }
    return next.handle(params);
  }
}
