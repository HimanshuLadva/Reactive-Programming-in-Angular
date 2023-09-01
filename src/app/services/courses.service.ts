import { Injectable } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})

export class CourseService {

    constructor(private http: HttpClient) { }

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>('/api/courses')
            .pipe(
                map(response => response['payload']),
                shareReplay()
            )
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        return this.http.put(`/api/courses/${courseId}`, changes)
        .pipe(
           shareReplay()
        )
    }
}
