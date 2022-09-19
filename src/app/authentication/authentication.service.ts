import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie-service';

export interface TokenInterface {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private cookie: CookieService) {}

  login(loginData) {
    return this.http.post<TokenInterface>('/api/login', loginData)
        .pipe(
        tap(resp => this.setSession(resp)), shareReplay());
  }

  refreshToken(token: string) {
    console.log(token);
    return this.http.get<TokenInterface>('/api/token/refresh', {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
    })
    .pipe(
        tap(resp => this.setSession(resp)), shareReplay());
  }

  private setSession(authResult) {
    console.log('Session set');
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    return authResult;
  }

  sessionAvailable() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    return !!(accessToken && refreshToken);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  public isLoggedIn() {
    if (this.sessionAvailable()) {
      const accessToken = localStorage.getItem('access_token');
      return !this.jwtHelper.isTokenExpired(accessToken);
    } else {
      return false;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  isTokenExpired() {
    if (this.sessionAvailable()) {
      const accessToken = localStorage.getItem('access_token');
      return this.jwtHelper.isTokenExpired(accessToken);
    } else {
      return true;
    }
  }
}
