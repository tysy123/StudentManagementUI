import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  {
    path: 'list',
    loadChildren: () =>
      import('./student-list/student-list.module').then(
        (m) => m.StudentListModule
      ),
  },
  {
    path: 'detail/:id',
    pathMatch: 'full',
    loadChildren: () =>
      import('./student-detail/student-detail.module').then(
        (m) => m.StudentDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
