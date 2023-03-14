import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListConditionPipe } from './filter-list-condition.pipe';

@NgModule({
  declarations: [FilterListConditionPipe],
  imports: [CommonModule],
  exports: [FilterListConditionPipe],
})
export class FilterListConditionModule {}
