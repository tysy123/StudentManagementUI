import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentListComponent } from './student-list.component';
import { StudentListRoutingModule } from './student-list-routing.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudentListComponent],
  imports: [
    CommonModule,
    StudentListRoutingModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StudentListModule {}
