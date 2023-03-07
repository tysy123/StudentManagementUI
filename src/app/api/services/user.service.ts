import { Injectable } from '@angular/core';
import { RqUserLoginParams, RsUserLogin } from '@apis/models/user.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}
  POST_LOGIN(body: RqUserLoginParams, opt?: any): Observable<RsUserLogin> {
    return this.api.post<RsUserLogin>('/account/login', body, opt);
  }
}
