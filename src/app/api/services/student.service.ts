import { Injectable } from '@angular/core';
import { RsGetStudent, RsGetStudents } from '@apis/models/student.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private api: ApiService) {}
  GET_STUDENTS(url: string, opt?: any): Observable<RsGetStudents> {
    return this.api.get<RsGetStudents>(url, opt);
  }
  GET_STUDENT_BY_ID(url: string): Observable<RsGetStudent> {
    return this.api.get<RsGetStudent>(url);
  }
  GET_STUDENT_BY_FILTER(url: string): Observable<RsGetStudents> {
    return this.api.get<RsGetStudents>(url);
  }
}
