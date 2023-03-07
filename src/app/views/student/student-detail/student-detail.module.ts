import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailComponent } from './student-detail.component';
import { StudentDetailRoutingModule } from './student-detail-routing.module';

@NgModule({
  declarations: [StudentDetailComponent],
  imports: [CommonModule, StudentDetailRoutingModule],
})
export class StudentDetailModule {}
