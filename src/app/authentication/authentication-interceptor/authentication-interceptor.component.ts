import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-authentication-interceptor',
  templateUrl: './authentication-interceptor.component.html',
  styleUrls: ['./authentication-interceptor.component.css']
})
export class AuthenticationInterceptorComponent implements HttpInterceptor {


  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // logged in
    if (this.authenticationService.isLoggedIn()) {
      // nothing to do since logged in
    } else {
      // Token refresh needed
      if (this.authenticationService.sessionAvailable()) {
        this.authenticationService.refreshToken();
      }
    }
    // add token to header
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ` + localStorage.getItem('access_token')),
    });

    // handle request with authorization header
    return next.handle(clonedReq).pipe(
        tap((event: HttpEvent<any>) => {

            },
            (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401 || err.status === 403) {
                  this.router.navigate(['/entry']);
                }
              }
            })
    );
  }
}
