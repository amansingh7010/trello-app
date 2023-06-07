import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, from } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const authRequest = req.clone({ headers });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse): any => {
        // token is expired
        // clear token from localstorage and navigate to login
        if (error && error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }
}
