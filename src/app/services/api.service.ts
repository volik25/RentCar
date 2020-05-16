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

  public getCar(carId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-car&carId=${carId}`);
  }

  public removeCar(car): Observable<any> {
    return this.http.post<string>(`${this.baseUrl}?key=remove-car`, car);
  }

  public getCars(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-cars`);
  }
  // public getCars(model?: SearchModel, limit?: number): Observable<any> {
  //   const url = new URL(this.baseUrl);
  //   url.searchParams.set('key', 'get-cars');
  //   if (model) {
  //     if (model.period) {
  //       url.searchParams.set('dateFrom', this.ngbDateToString(model.period.fromDate));
  //       if (model.period.toDate) {
  //         url.searchParams.set('dateTo', this.ngbDateToString(model.period.toDate));
  //       }
  //     }
  //     if (model.price) {
  //       if(model.price.from != 1500){
  //         url.searchParams.set('priceFrom', model.price.from.toString());
  //       }
  //       if(model.price.to != 8000){
  //         url.searchParams.set('priceTo', model.price.to.toString());
  //       }
  //     }
  //   }
  //   if (limit) {
  //     url.searchParams.set('limit', limit.toString());
  //   }
  //   return this.http.get<any>(url.href);
  // }
  public addCar(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=add-car`, data);
  }

  public updateCar(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=update-car`, data);
  }

  public uploadCarImg(data): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?key=upload-img`, data);
  }
}