import { Observable } from 'rxjs';
import { BaseService } from './_base.service';

export class CarService extends BaseService {
  baseUrl = '/car';

  getCarsFilters<T>(): Observable<T[]> {
    return this.http.get<[T]>(
        this.baseUrl + '/filters', {
        withCredentials: true,
        headers: {
            Authorization: localStorage.getItem('rentCar.user.token') || '',
        },
    });
  }
}
