import { Component, OnInit } from '@angular/core';
import { StudentService } from '@apis/services/student.service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subject, takeUntil, Observable, take  } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  gridView: GridDataResult | any;
  pageSize: number = 5;
  skip: number = 0;
  subscribesList = new Subject();
  url: string = '/Student/get-students';

  filterForm: FormGroup;

  items: any;

  // x: number = 1;

  constructor(readonly studentService: StudentService, fb: FormBuilder) {
    this.filterForm = fb.group({
      filter: ['', Validators.required],
      keyWord: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getStudent();
  }
  ngOnDestroy() {
    this.subscribesList.next(null);
    this.subscribesList.complete();
  }
  test()
  {
    this.subscribesList.unsubscribe();
  }
  test_check()
  {
    const observable = new Observable(observer => {
      let x = 5;
      observer.next(x);
      x += 10;
      setTimeout(() => {
      observer.next(x);
      observer.complete();
      }, 1000);
    });
    // .pipe(take(5));
    
    const observer = {
      next: (value:any) => console.log(value),
      complete: () => console.log('done')
    };
    
    observable.subscribe(observer);

    setTimeout(() => {
      observable.subscribe(observer);
    }, 1000);
  }
  getStudent() {
    this.url = '/student/get-students';
    this.skip = 0;
    // this.studentService
    //   .GET_STUDENTS(this.url) 
    //   .pipe(takeUntil(this.subscribesList))
    //   .subscribe(({ data, code, message, status }) => {
    //     if (data && message !== 'NotFound') {
    //       this.items = data;
    //       this.loadItems();
    //     } else this.items = [];
    //   });
    this.studentService
      .GET_STUDENTS(this.url)
      .pipe(takeUntil(this.subscribesList))
      .subscribe({
        next: ({data, code, message, status}) => {
          if (data && message !== 'NotFound') {
                  this.items = data;
                  this.loadItems();
                } else this.items = [];
        },
        error: (e) => console.error(e),
        complete: () => console.log('done')
      });
  }

  getStudentByFilter(filter: string, keyWord: string) {
    this.url = `/student/get-student-by-filter/${filter}/${keyWord}`;
    this.skip = 0;
    this.studentService
      .GET_STUDENT_BY_FILTER(this.url)
      .pipe(takeUntil(this.subscribesList))
      .subscribe(({ data, code, message, status }) => {
        if (data && message !== 'NotFound') {
          this.items = data;
          this.loadItems();
        } else this.items = [];
      });
  }

  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  loadItems(): void {
    this.gridView = {
      data: this.items
        ? this.items.slice(this.skip, this.skip + this.pageSize)
        : [],
      total: this.items ? this.items.length : 0,
    };
  }

  search() {
    let rs = this.filterForm.value;

    if (rs.filter == '') alert('please choose options filter');
    else if (rs.keyWord.trim() == '') {
      alert('please input keyWord');
    } else {
      this.getStudentByFilter(rs.filter, rs.keyWord);
    }
    console.log(rs);
  }
}
