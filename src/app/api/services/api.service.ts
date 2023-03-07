import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  Subject,
  takeUntil,
  throwError,
  timeout,
} from 'rxjs';
import { UserTokenService } from './user-token.service';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  private userToken?: string;
  private subscribes = new Subject();

  constructor(
    private http: HttpClient,
    private userTokenService: UserTokenService
  ) {
    this.userTokenService.userToken$
      .pipe(takeUntil(this.subscribes))
      .subscribe((token) => {
        if (token) {
          this.userToken = token;        
        }
      });
    this.userTokenService.fetchToken();
  }
  ngOnDestroy() {
    this.subscribes.next(null);
    this.subscribes.complete();
  }
  private handleError = (error: HttpErrorResponse) => {
    const err = new Error('An unexpected error occurred. please try again.');
    return throwError(() => err);
  };

  createHttpOptions(headers: any) {
    const httpOptions: any = {};
    httpOptions.headers = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        httpOptions.headers = httpOptions.headers.append(
          key,
          headers[key] ? headers[key] : ''
        );
      });
    }
    if (this.userToken) {
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        `Bearer ${this.userToken}`
      );
    }
    return httpOptions;
  }

  get<T>(endPoint: string, headers?: Headers): Observable<any> {
    return this.http
      .get<T>(`${this.baseUrl}${endPoint}`, this.createHttpOptions(headers))
      .pipe(timeout(Number(environment.timeOut)), catchError(this.handleError));
  }
  post<T>(
    endPoint: string,
    body = {},
    headers?: Headers,
    timeOut?: number
  ): Observable<any> {
    return this.http
      .post<T>(
        `${this.baseUrl}${endPoint}`,
        body,
        this.createHttpOptions(headers)
      )
      .pipe(
        timeout(Number(timeOut || environment.timeOut)),
        catchError(this.handleError)
      );
  }
}
