import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailComponent } from './student-detail.component';
import { StudentDetailRoutingModule } from './student-detail-routing.module';
import { AppTitleModule } from '@app/common/pipes/app-title/app-title.module';
import { ConvertUserGmailPipeModule } from '@app/common/pipes/convert-user-gmail/convert-user-gmail.modules';
import { FilterListConditionModule } from '@app/common/pipes/filter-list-condition/filter-list-condition.module';

@NgModule({
  declarations: [StudentDetailComponent],
  imports: [
    CommonModule,
    StudentDetailRoutingModule,
    AppTitleModule,
    ConvertUserGmailPipeModule,
    FilterListConditionModule,
  ],
})
export class StudentDetailModule {}
