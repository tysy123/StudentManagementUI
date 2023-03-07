
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@apis/services/auth-guard.service';
import { LoginPageComponent } from './views/login/login-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },  
  {
    path: 'student',     
    loadChildren: () =>
      import('./views/student/student.module').then((m) => m.StudentModule),
    canActivate: [AuthGuardService],
  },  
  {
    path: '**',
    redirectTo: '/student/list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
