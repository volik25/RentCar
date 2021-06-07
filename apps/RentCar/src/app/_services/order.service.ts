import { Observable } from "rxjs";
import { BaseService } from "./_base.service";

export class OrderService extends BaseService {
    baseUrl = '/order'

    updateStatuses<T>(model): Observable<T> {
        return this.http.put<T>(this.baseUrl + '/' + model.id, model, {
            withCredentials: true,
            headers: {
              'Authorization': localStorage.getItem('rentCar.user.token') || ''
            }
          });
    }
}