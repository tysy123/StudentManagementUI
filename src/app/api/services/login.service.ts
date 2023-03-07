import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { UserTokenService } from './user-token.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private userTokenService: UserTokenService,
    private userService: UserService,
    public jwtHelperService: JwtHelperService    
  ) {}
  login({ userName, passWord }: { userName: string; passWord: string }) {
    this.userTokenService.removeToken();
    this.userService
      .POST_LOGIN({
        userName,
        passWord,
      })
      .pipe(take(1))
      .subscribe(({ data, code, message, status }) => {
        if (data) {          
          if (data?.token) {
            this.userTokenService.setToken(data?.token);
            this.router.navigateByUrl('/student/list');
          }
        } else {
          if (message === 'UserName or password is incorrect' || code === 401) {
            alert(message);
          }
        }
      });
  }

  get userToken() {  
    return this.userTokenService.getToken();
  }


  get isAuthenticated(): boolean {
    return !this.jwtHelperService.isTokenExpired(this.userToken);
  }
}
