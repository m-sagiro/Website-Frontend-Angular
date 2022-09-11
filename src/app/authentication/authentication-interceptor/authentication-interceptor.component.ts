import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-authentication-interceptor',
  templateUrl: './authentication-interceptor.component.html',
  styleUrls: ['./authentication-interceptor.component.css']
})
export class AuthenticationInterceptorComponent implements HttpInterceptor {


  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
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



    // return next.handle(req);
  }
}
