import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentResult } from '@apis/models/student.model';
import { StudentService } from '@apis/services/student.service';
import {
  finalize,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
  takeWhile,
  timer,
  fromEvent,
  of,
  from,
  pluck,
  scan,
  reduce,
  toArray,
  filter,
  first,
  last,
  find,
  single,
  take,
  takeLast,
  interval,
  skip,
  skipUntil,
  timeout,
  skipWhile,
} from 'rxjs';

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
  test: Date = new Date();
  studentId: string | null = '';
  subscribes = new Subject();

  nameTitle: string = 'test';

  observer = {
    next: (val: any) => console.log(val),
    error: (err: any) => console.log(err),
    complete: () => console.log('complete'),
  };

  users: User[] = [
    {
      id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
      username: 'tiepphan',
      firstname: 'tiep',
      lastname: 'phan',
      postcount: 5,
    },
    {
      id: '34784716-019b-4868-86cd-02287e49c2d3',
      username: 'nartc',
      firstname: 'chau',
      lastname: 'tran',
      postcount: 4,
    },
  ];

  source = new Observable<User>((observer) => {
    setTimeout(() => {
      observer.next(this.users[0]);
    }, 1000);
    setTimeout(() => {
      observer.next(this.users[1]);
      observer.complete();
    }, 3000);
  });

  user$ = new Observable<User>((observer) => {
    setTimeout(() => {
      observer.next(this.users[0]);
    }, 1000);
    setTimeout(() => {
      observer.next(this.users[1]);
      observer.complete();
    }, 3000);
  });

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  time$: Observable<number> = timer(0, 1000).pipe(
    map((val) => 5 - (val + 1)),
    startWith(5),
    finalize(() => {
      this.nameTitle = '';
    }),
    takeWhile((val) => val >= 0)
  );

  ngOnInit(): void {
    // this.student = {
    //   id: 1,
    //   name:"test",
    //   phoneNumber: "123"
    // }
    // this.getStudentById();
    this.getOperator();
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

  getOperator() {
    /*
      Các hàm không tự động complete hàm fromEnvent, fromEventPattern, internal 
      đối vs những hàm này cần unscribe thủ công để tránh tràn bộ nhớ
    */
    /*
      timer có 2 cách dùng: 
      1) Tạo Observable mà sẽ emit giá trị sau khi delay 1 khoảng thời gian nhất định.
        Cách dùng này sẽ tự complete nhé.
        E.g: timer(1000).subscribe(observer)
        // output: sau 1 giây -> 0
        // complete: 'complete'
      2)Tạo Observable mà sẽ emit giá trị sau khi delay 1 khoảng thời gian và sẽ emit giá trị sau mỗi chu kỳ sau đó.
      Cách dùng này tương tự với interval() nhưng timer() hỗ trợ delay trước khi emit.
      Vì cách dùng này giống với interval() nên sẽ không tự complete.
        E.g: timer(1000, 1000).subscribe(observer); // output: sau 1 giây -> 0, 1, 2, 3, 4, 5 ...
    */
    /*
      Transformation rxjs : sẽ xử lí dữ liệu trước khi nó emit tức trước khi nó subcrise 
      map => format lại giá trị đầu ra nhg vãn giữ nguyên giá tri
      mapTo => khác với map, mapTo set giá trị trả ra dù emit value gì thì cg ra 1 gtri duy nhất mình set
      scan => muốn áp đặt 1 function lên value trước khi emit nhưng có sử dụng kết quả trước đó mỗi giá trị đều đc emit ra ngoài
            accc: chính là giá trị trước đó, curr: giá trị hiện tại, seed là gtri bắt đầu 
      reduce => giống scan nhưng mà nó chỉ trả ra 1 giá trị sau cùng rồi ms emit value ra ngoài nên chỉ ra 1 giá trị
      toArray => lưu trữ các emit value đc đẩy ra ngoài stream.
      buffer => Lưu trữ giá trị được emit ra và đợi đến khi closingNotifier emit thì emit những giá trị đó thành 1 array.
      bufferTime => như buffer nhưng set đc thời gian để emit ra

      Filtering rxjs: dùng để lược/ loc các giá trị được emit value từ Observable gốc
      filer => trả cả các emit thỏa điều kiện filter
      first => trả ra giá trị emit đầu tiên trong observable
      last => trả ra giá trị emit cuối cùng trong observable trc khi complete
      find => chỉ trả ra 1 emit đầu tiên thỏa điều kiện
      single => giống first nhưng nghiêm ngặt hơn là chỉ trả 1 giá trị duy nhất thỏa điều kiện nếu hơn sẽ báo lỗi, 
              còn first nếu có hơn nhiều gtri thỏa thì cg chỉ trả ra 1 những k bảo lỗi 
      take => nhận vào tham số count => trả ra những emit value  qui định theo số count vd take(2) 
           => trả ra 2 emit đầu tiền sau đó complete
           take(1) khác first() ở chỗ take(1) sẽ không throw bất cứ error nào nếu như Observable tự complete
           mà không emit giá trị nào.
      takeLast => giống take nhưng sẽ lấy theo chiều value xếp cuối cùng
      takeUntil => nhận vào tham số là 1 observable như cờ thông báo để kích hoạt emit value observable gốc cho đến khi noitify emit
                   takeUntil() được dùng để unsubscribe Observable trong ngOnDestroy() là rất phổ biến.
                   Các bạn suy nghĩ mình có 1 destroySubject: Subject<void> tượng trưng cho notifier.
                   Khi ngOnDestroy() thực thi, chúng ta sẽ cho destroySubject.next() (emit) 
                   và sử dụng takeUntil(this.destroySubject) 
                   thì Observable trong Component sẽ được unsubscribe khi ngOnDestroy() thực thi 
                   -> khi Component unmount.
      takeWhile => giống takeUntil đều là notifi nhưng nhận vào điều kiện chứ k nhận vào 1 observable
      skip => giống take những là bỏ qua số lượng value truyển vào 
      skipUntil => hoạt động như takeUntil vd như thay vì dùng takeUntil nghe click event(observable) click đến lần thứ 5
               thì emit observable gốc sẽ kết thúc sau khi thèn click kết thúc thì skipUntil sẽ y như skip nhg đổi vs observable
               đến lần thứ 5 ms emit value ra 
      skipWhile => giống vs takeWhile nhận vào condition và có tính chất như skip
    */

    // E.g
    //map
    this.source
      .pipe(
        map((user) => {
          return {
            ...user,
            fullname: `${user.firstname} ${user.lastname}`,
          };
        })
      )
      .subscribe(this.observer);
    this.source.pipe(map((user) => user.id)).subscribe(this.observer);
    // this.source.pipe(pluck('id')).subscribe(this.observer);

    //scan
    this.source
      .pipe(scan((acc, curr) => acc + curr.postcount, 4))
      .subscribe(this.observer);

    //reduce
    this.source
      .pipe(reduce((acc, curr) => acc + curr.postcount, 13))
      .subscribe(this.observer);

    //toArray
    this.source.pipe(toArray()).subscribe(this.observer);

    this.source
      .pipe(
        map((val) => val.firstname),
        toArray()
      )
      .subscribe(this.observer);

    //buffer
    this.source.pipe().subscribe(this.observer);

    //filter
    from([1, 2, 3, 4, 5, 6])
      .pipe(
        filter((x) => x % 2 === 0) // số chẵn
      )
      .subscribe((val) => console.log('filter', val));

    //first
    from([1, 2, 3, 4, 5, 6])
      .pipe(first((val) => val > 6, 'default value'))
      .subscribe((val) => console.log('first', val));

    //last
    from([1, 2, 3, 4, 5, 6])
      .pipe(last((val) => val > 4, 'default value'))
      .subscribe((val) => console.log('last', val));

    //find
    from([1, 2, 3, 4, 5, 6])
      .pipe(find((val) => val < 5, 'default value'))
      .subscribe((val) => console.log('find', val));

    //single
    from([1, 2, 3, 4, 5, 6])
      .pipe(single((val) => val < 5))
      .subscribe((val) => console.log('single', val));

    //take
    from([1, 2, 3, 4, 5, 6])
      .pipe(take(3))
      .subscribe((val) => console.log('take', val));

    //takeLast
    from([1, 2, 3, 4, 5, 6])
      .pipe(takeLast(3))
      .subscribe((val) => console.log('takeLast', val));

    //takeWhile
    interval(1000)
      .pipe(takeWhile((x) => x < 6))
      .subscribe(
        (val) => console.log('takeWhile', val),
        null,
        () => console.log('complete')
      ); // output: 0, 1, 2, 3, 4, 5 --> complete

    //skip
    from([1, 2, 3, 4, 5, 6])
      .pipe(skip(4))
      .subscribe((val) => console.log('skip', val));

    //skipUntil
    // interval(1000)
    //   .pipe(skipUntil(fromEvent(document, 'click')))
    //   .subscribe((val) => console.log('skipUntil', val)); // output: click at 5 seconds -> 5, 6, 7, 8, 9....

    //skipWhile
    // interval(1000)
    //   .pipe(skipWhile((x) => x < 5))
    //   .subscribe(console.log); // output: 6, 7, 8, 9...
  }
}
export default interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  postcount: number;
}
