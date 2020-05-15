import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { SearchModel } from './search.service';
//import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
//import { Place } from '../models/place';
//import { Order, UpdateOrder, DateRange } from '../models/order';
import { tap } from 'rxjs/internal/operators';
//import { User } from '../models/user';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  private baseUrl: string = "http://vdknf.beget.tech/RentCarBack/controller.php";
  constructor(private http: HttpClient) {}

  /** Проверка доступа админа */
  public checkAccess(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}?key=check-admin`);
  }

  public signIn(userData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?key=sign-in`, userData);
  }

  public signUp(userData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?key=sign-up`, userData);
  }

  public getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-user`);
  }
}