import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MessagesService } from "../messages/messages.service";
import { LoadingService } from "../loading/loading.service";

@Injectable({
  providedIn: 'root'
})

export class CoursesStore {

  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private messageService: MessagesService, private loadingService: LoadingService) {

    this.loadAllCourses();

  }

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>('/api/courses')
      .pipe(
        map(res => res["payload"]),
        catchError(err => {
          const message = "Could not load courses";
          this.messageService.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap(courses => this.subject.next(courses))
      )

    this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses.filter(course => course.category == category).sort(sortCoursesBySeqNo))
    )
  }

}
