/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  OnInit
} from '@angular/core';

import { Subject, take } from 'rxjs';

@Component({
  selector: 'app-student',
//   standalone: true,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit { 
  constructor() {}

  ngOnInit(): void {
   
  }

  ngOnDestroy() {   
  }
}
