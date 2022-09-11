import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  private setSession(authResult) {
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    return authResult;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  public isLoggedIn() {
    const accessToken = localStorage.getItem('access_token');
    return this.jwtHelper.isTokenExpired(accessToken);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const accessToken = localStorage.getItem('access_token');
    return this.jwtHelper.getTokenExpirationDate(accessToken);
  }
}
