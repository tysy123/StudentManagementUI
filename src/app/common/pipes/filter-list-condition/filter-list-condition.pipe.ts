import { Pipe, PipeTransform } from '@angular/core';
import {  StudentResult } from '@apis/models/student.model';

@Pipe({
  name: 'filterListCondition',
})
export class FilterListConditionPipe implements PipeTransform {
  private rs: StudentResult[] = [];
  transform(arr: StudentResult[], condition: number = 1): StudentResult[] {
    switch (condition) {
      case 1:
        this.rs = arr.filter((val) => val.id > 5);
        break;
    }
    return this.rs;
  }
}
