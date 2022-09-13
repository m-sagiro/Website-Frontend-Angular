import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

export interface TokenInterface {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {}

  login(loginData) {
    return this.http.post<TokenInterface>('/api/login', loginData)
        .pipe(
        tap(resp => this.setSession(resp)), shareReplay());
  }

  refreshToken() {
    return this.http.post<TokenInterface>('/api/token/refresh', {}, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('refresh_token')),
    });
  }

  private setSession(authResult) {
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

  getExpiration() {
    if (this.sessionAvailable()) {
      const accessToken = localStorage.getItem('access_token');
      return this.jwtHelper.getTokenExpirationDate(accessToken);
    } else {
      return false;
    }
  }
}
