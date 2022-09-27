import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, filter, take, switchMap, tap} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Component({
  selector: 'app-authentication-interceptor',
  templateUrl: './authentication-interceptor.component.html',
  styleUrls: ['./authentication-interceptor.component.css']
})
export class AuthenticationInterceptorComponent implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
      if (req.url.includes('/api/token/refresh')) {
          return next.handle(req);
      }

      let authReq = req;
      const token = localStorage.getItem('access_token');
      if (token != null) {
          authReq = this.addTokenHeader(req, token);
      }
      return next.handle(authReq).pipe(
          catchError(error => {
              if (error instanceof HttpErrorResponse && error.status === 403 && this.authenticationService.isTokenExpired()) {
                  return this.handleError(authReq, next);
              }
              return throwError(error);
          })
      );
  }

  private handleError(request: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
              return this.authenticationService.refreshToken(refreshToken).pipe(
                switchMap((res: any) => {
                    this.isRefreshing = false;
                    localStorage.setItem('access_token', res.access_token);
                    this.refreshTokenSubject.next(res.access_token);
                    return next.handle(this.addTokenHeader(request, res.access_token));
                }),
                  catchError(err => {
                      this.isRefreshing = false;
                      this.authenticationService.logout();
                      this.router.navigate(['/entry'], {state: {'error': 'Please re-log!'}});
                      return throwError(err);
                  })
              );
          }
      }
      return this.refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap((token) =>
              next.handle(this.addTokenHeader(request, token))
          )
      );
  }


  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
  }


}
