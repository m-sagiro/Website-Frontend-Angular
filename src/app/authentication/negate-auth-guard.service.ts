import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class NegateAuthGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuth = this.authenticationService.isLoggedIn();
    if (!isAuth) {
      this.router.navigate(['/entry'], {state: {'error': 'Please log in!'}});
    } else {
      return true;
    }
  }
}
