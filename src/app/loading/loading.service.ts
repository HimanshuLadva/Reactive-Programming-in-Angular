import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, delay, finalize, tap } from "rxjs/operators";

@Injectable()

export class LoadingService {
   private loadingSubject = new BehaviorSubject<boolean>(false);

   loading$: Observable<boolean> = this.loadingSubject.asObservable();

   showLoaderUntilCompleted<T>(obs$ : Observable<T>): Observable<T> {
      return of(null).pipe(
          tap(() => this.loadingOn()),
          concatMap(() => obs$),
          delay(2000),
          finalize(() => this.loadingOff())
      )
   }

   loadingOn() {
      this.loadingSubject.next(true);
   }

   loadingOff() {
      this.loadingSubject.next(false);
   }
}

