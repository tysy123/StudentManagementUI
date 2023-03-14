import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentResult } from '@apis/models/student.model';
import { StudentService } from '@apis/services/student.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  student: StudentResult = {
    id: 0,
    name: '',
    phoneNumber: '',
  };
  test : Date = new Date();
  studentId: string | null = '';
  subscribes = new Subject();
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.student = {
    //   id: 1,
    //   name:"test",
    //   phoneNumber: "123"
    // }
    this.getStudentById();
    console.log(this.student, 'student');
  }

  ngOnDestroy() {
    this.subscribes.next(null);
    this.subscribes.complete();
  }

  getStudentById() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    let url = `/student/get-student/${this.studentId}`;
    console.log(url, 'url detail');
    this.studentService
      .GET_STUDENT_BY_ID(url)
      .pipe(takeUntil(this.subscribes))
      .subscribe(({ data, code, message, status }) => {
        if (data) {
          this.student = data;
        }
      });
  }
}
