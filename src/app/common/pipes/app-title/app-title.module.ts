import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTitlePipe } from './app-title.pipe';

@NgModule({
  declarations: [AppTitlePipe],
  imports: [CommonModule],
  exports: [AppTitlePipe],
})
export class AppTitleModule {}
