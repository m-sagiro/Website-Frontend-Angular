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

// Froala Imports
import 'froala-editor/js/plugins/align.min';
import 'froala-editor/js/plugins/char_counter.min';
import 'froala-editor/js/plugins/code_view.min';
import 'froala-editor/js/plugins/colors.min';
import 'froala-editor/js/plugins/code_beautifier.min';
import 'froala-editor/js/plugins/draggable.min';
import 'froala-editor/js/plugins/edit_in_popup.min';
import 'froala-editor/js/plugins/emoticons.min';
import 'froala-editor/js/plugins/entities.min';
import 'froala-editor/js/plugins/file.min';
import 'froala-editor/js/plugins/files_manager.min';
import 'froala-editor/js/plugins/font_family.min';
import 'froala-editor/js/plugins/forms.min';
import 'froala-editor/js/plugins/font_size.min';
import 'froala-editor/js/plugins/fullscreen.min';
import 'froala-editor/js/plugins/help.min';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/image_manager.min';
import 'froala-editor/js/plugins/inline_class.min';
import 'froala-editor/js/plugins/inline_style.min';
import 'froala-editor/js/plugins/line_breaker.min';
import 'froala-editor/js/plugins/line_height.min';
import 'froala-editor/js/plugins/link.min';
import 'froala-editor/js/plugins/lists.min';
import 'froala-editor/js/plugins/paragraph_format.min';
import 'froala-editor/js/plugins/paragraph_style.min';
import 'froala-editor/js/plugins/print.min';
import 'froala-editor/js/plugins/quick_insert.min';
import 'froala-editor/js/plugins/quote.min';
import 'froala-editor/js/plugins/save.min';
import 'froala-editor/js/plugins/special_characters.min';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/plugins/track_changes.min';
import 'froala-editor/js/plugins/trim_video.min';
import 'froala-editor/js/plugins/url.min';
import 'froala-editor/js/plugins/video.min';
import 'froala-editor/js/plugins/word_paste.min';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

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
