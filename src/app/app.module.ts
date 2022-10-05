import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import {HomepageModule} from './homepage/homepage.module';
import {AboutModule} from './about/about.module';
import {BlogModule} from './blog/blog.module';
import {ContactModule} from './contact/contact.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptorComponent} from './authentication/authentication-interceptor/authentication-interceptor.component';
import {JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import {ContentPagesModule} from './pages/content-pages/content-pages.module';
import {AuthGuardService} from './authentication/auth-guard.service';
import {NegateAuthGuardService} from './authentication/negate-auth-guard.service';
import {RECAPTCHA_SETTINGS, RecaptchaSettings} from 'ng-recaptcha';
import {environment} from '../environments/environment';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomepageModule,
    AboutModule,
    BlogModule,
    ContactModule,
    ContentPagesModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorComponent, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService,
    NegateAuthGuardService,
    {provide: RECAPTCHA_SETTINGS, useValue: { siteKey: environment.recaptcha.siteKey} as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
