import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertUserGmailPipe } from './convert-user-gmail.pipe';


@NgModule({
  declarations: [ConvertUserGmailPipe],
  imports: [CommonModule],
  exports: [ConvertUserGmailPipe],
})
export class ConvertUserGmailPipeModule {}
