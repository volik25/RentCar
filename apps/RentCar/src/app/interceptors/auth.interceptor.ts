import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(req: HttpRequest<{}>, next: HttpHandler): Observable<HttpEvent<{}>> {
    let params = req;
    if (sessionStorage.getItem('bookingUserToken')) {
      let token = sessionStorage.getItem('bookingUserToken');
      const paramReq = req.clone({
        params: req.params.set('token', token),
      });
      params = paramReq;
    }
    return next.handle(params);
  }
}
