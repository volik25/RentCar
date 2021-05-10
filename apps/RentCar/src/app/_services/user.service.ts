import { Observable } from "rxjs";
import { BaseService } from "./_base.service";

export class UserService extends BaseService {
    baseUrl = '/user'

    
  public changePassword(email): Observable<boolean> {
    return this.http.get<any>(`${this.baseUrl}?key=password-change&email=${email}`);
  }

  public signIn(userData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?key=sign-in`, userData);
  }

  public signUp(userData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?key=sign-up`, userData);
  }
  
  public getUserId(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?key=get-user-id`);
  }
}