import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {
  storageKey = 'userToken';
  private _userToken$ = new BehaviorSubject<string | undefined>(undefined);
  userToken$ = this._userToken$.asObservable();
  constructor() { }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  setToken(token: any) {   
    localStorage.setItem(this.storageKey,JSON.stringify(token));
    this.fetchToken();
  }

  removeToken() {
    if (
      localStorage.getItem(this.storageKey)
    ) {
      localStorage.removeItem(this.storageKey);
      this.fetchToken();
    }    
  }

  fetchToken() {
    const value = localStorage.getItem(this.storageKey);   
    if(value)
      this._userToken$.next(JSON.parse(value));
  }
}
