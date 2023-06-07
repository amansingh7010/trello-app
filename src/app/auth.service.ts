import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private loginUrl = 'http://localhost:9000/login';
  private redirectUrl = 'http://localhost:9000/callback';

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) return true;
    return false;
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
        localStorage.setItem('loggedIn', 'true');
        console.log('redirect success');
      }),
      catchError(this.handleError<any>('redirect'))
    );
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
