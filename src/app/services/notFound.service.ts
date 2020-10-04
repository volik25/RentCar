import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class notFoundService{
    private notFound = new BehaviorSubject(false);

    setNotFound(value): void {
        this.notFound.next(value);
      };

    getNotFound(): Observable<boolean>{
        return this.notFound;
    }
}