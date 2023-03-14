import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentListComponent } from './student-list.component';
import { StudentListRoutingModule } from './student-list-routing.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterListConditionModule } from '@app/common/pipes/filter-list-condition/filter-list-condition.module';

@NgModule({
  declarations: [StudentListComponent],
  imports: [
    CommonModule,
    StudentListRoutingModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    FilterListConditionModule
  ],
})
export class StudentListModule {}
