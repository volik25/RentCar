import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { User } from '../models/user';
import { Order, UpdateOrder, CarDates } from '../models/order';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../models/car';

@Injectable()
export class ApiService {
  private baseUrl: string = "http://vdknf.beget.tech/RentCarBack/controller.php";
  constructor(private http: HttpClient) {}

  /** Проверка доступа админа */
  public checkAccess(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}?key=check-admin`);
  }

  public changePassword(email): Observable<boolean> {
    return this.http.get<any>(`${this.baseUrl}?key=password-change&email=${email}`);
  }

  public signIn(userData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?key=sign-in`, userData);
  }

  public signUp(userData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?key=sign-up`, userData);
  }

  public updateUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=update-user`, user);
  }

  public getUserId(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-user-id`);
  }

  public getUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-user`);
  }

  public getCar(carId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-car&carId=${carId}`);
  }

  public getPlaces(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-places`);
  }

  public getComments(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-comments&carId=${id}`);
  }

  public getRating(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-rating&id=${id}`);
  }

  public addComment(comment): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}?key=add-comment`, comment);
  }

  public updateComment(comment): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=update-comment`, comment);
  }

  public deleteComment(id): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=delete-comment&id=${id}`);
  }
  
  public isUserLike(id): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=user-like&id=${id}`);
  }

  public getLikes(id): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-likes&id=${id}`);
  }

  public likeAction(action): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=like-action`, action);
  }

  public addPlace(data): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}?key=add-place`, data);
  }

  public updatePlace(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=update-place`, data);
  }

  public deletePlace(id): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=delete-place&placeId=${id}`);
  }

  public removeCar(car): Observable<any> {
    return this.http.post<string>(`${this.baseUrl}?key=remove-car`, car);
  }

  public getFilteredCars(params:Car): Observable<any> {
    let request = '';
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        if (value !== null) {
          switch (key) {
            case 'minPrice':
              request += `&minPrice=${value}`;
              break;
            case 'maxPrice':
              request += `&maxPrice=${value}`;
              break;
            case 'AC':
              request += `&AC=${value}`;
              break;
            case 'bodyType':
              request += `&bodyType=${value}`;
              break;
            case 'createYear':
              request += `&createYear=${value}`;
              break;
            case 'doors':
              request += `&doors=${value}`;
              break;
            case 'fuelType':
              request += `&fuelType=${value}`;
              break;
            case 'hasAirbags':
              request += `&hasAirbags=${value}`;
              break;
            case 'kpp':
              request += `&kpp=${value}`;
              break;
            case 'sits':
              request += `&sits=${value}`;
              break;
            case 'steering':
              request += `&steering=${value}`;
              break;
            case 'wheelDrive':
              request += `&wheelDrive=${value}`;
              break;
            default:
              break;
          }
        }
      }
    }
    return this.http.get<any>(`${this.baseUrl}?key=get-filtered-cars${request}`);
  }

  public getCars(lim?:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-cars&limit=${lim}`);
  }

  public getFilters(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-filters`);
  }

  public addCar(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=add-car`, data);
  }

  public updateCar(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=update-car`, data);
  }

  public uploadCarImg(data): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?key=upload-img`, data);
  }

  public addOrder(order: Order): Observable<any> {
    order.dateFrom = this.ngbDateToString(order.dateFrom as NgbDate);
    order.dateTo = order.dateTo ? this.ngbDateToString(order.dateTo as NgbDate) : null;
    order.time = this.ngbTimeToString(order.time as NgbTimeStruct);
    return this.http.post<any>(`${this.baseUrl}?key=add-order`, order);
  }

  public updateOrder(order: UpdateOrder): Observable<any> {
    order.dateFrom = this.ngbDateToString(order.dateFrom as NgbDate);
    order.dateTo = order.dateTo ? this.ngbDateToString(order.dateTo as NgbDate) : null;
    order.time = this.ngbTimeToString(order.time as NgbTimeStruct);
    return this.http.post<any>(`${this.baseUrl}?key=update-order`, order);
  }

  public cancelOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}?key=remove-order&orderId=${orderId}`);
  }

  public updateStatuses(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}?key=update-statuses`, data);
  }

  public getOrders(lim:boolean = false): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}?key=get-orders&limit=${lim}`).pipe(
      tap((orders) => {
        orders.forEach((order) => {
          order.dateFrom = this.stringToNgbDate(order.dateFrom as string);
          order.dateTo = order.dateTo ? this.stringToNgbDate(order.dateTo as string) : null;
          order.time = this.stringToNgbTime(order.time as string);
        });
      })
    );
  }
  
  public getCarDates(id: number): Observable<CarDates[]> {
    return this.http.get<CarDates[]>(`${this.baseUrl}?key=get-car-dates&carId=${id}`).pipe(
      tap((dates) => {
        dates.forEach((date) => {
          date.dateFrom = this.stringToNgbDate(date.dateFrom as string);
          date.dateTo = date.dateTo ? this.stringToNgbDate(date.dateTo as string) : null;
        });
      })
    );
  }

  private ngbDateToString(date: NgbDate): string {
    if(!date){
      return null;
    }
    const newDate = new Date(date.year, date.month - 1, date.day);
    const [year, month, day] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
    return `${year < 10 ? `0${year}` : year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  }

  private stringToNgbDate(date: string): NgbDate {
    if(!date){
      return null;
    }
    const newDate = date.split('-');
    return NgbDate.from({ year: +newDate[0], month: +newDate[1], day: +newDate[2] });
  }

  public ngbTimeToString(time: NgbTimeStruct): string {
    return `${time.hour < 10 ? `0${time.hour}` : time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}`;
  }

  private stringToNgbTime(time: string): NgbTimeStruct {
    const newTime = time.split(':');
    return { hour: +newTime[0], minute: +newTime[1], second: 0 };
  }
}