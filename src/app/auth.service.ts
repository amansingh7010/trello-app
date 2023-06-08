import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as apis from './constants/apis.constants';
import * as routes from './constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private loginUrl = `http://localhost:9000/${apis.LOGIN}`;
  private redirectUrl = `http://localhost:9000/${apis.REDIRECT}`;

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) return true;
    return false;
  }

  getAccessToken(): any {
    if (this.isLoggedIn()) return localStorage.getItem('token');
    else return null;
  }

  login(): Observable<any> {
    return this.http.get<any>(this.loginUrl).pipe(
      tap((data) => {
        document.location.href = data.authUrl;
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  redirect(params: any): Observable<any> {
    const urlWithParams = `${this.redirectUrl}?oauth_token=${params['oauth_token']}&oauth_verifier=${params['oauth_verifier']}`;
    return this.http.get<any>(urlWithParams).pipe(
      tap((data) => {
        localStorage.setItem('token', data.token);
        console.log('redirect success');
      }),
      catchError(this.handleError<any>('redirect'))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate([`/${routes.LOGIN}`]);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
