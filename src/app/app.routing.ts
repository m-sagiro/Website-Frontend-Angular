import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage/homepage.component';
import {AboutComponent} from './about/about/about.component';
import {BlogComponent} from './blog/blog/blog.component';
import {BlogViewComponent} from './blog/blog-view/blog-view.component';
import {ContactComponent} from './contact/contact/contact.component';
import {LoginComponent} from './pages/content-pages/login/login.component';
import {TestComponent} from './test/test/test.component';
import {AuthGuardService} from './authentication/auth-guard.service';
import {NegateAuthGuardService} from './authentication/negate-auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: HomepageComponent, data: {title: 'Home'}},
    { path: 'about',             component: AboutComponent, data: {title: 'About'}},
    { path: 'blog',             component: BlogComponent, data: {title: 'Blog'}},
    { path: 'blog/:id',             component: BlogViewComponent },
    { path: 'contact',             component: ContactComponent, data: {title: 'Contact'}},
    { path: 'entry',             component: LoginComponent, data: {title: 'Login'}, canActivate: [AuthGuardService]},
    { path: 'test',             component: TestComponent, data: {title: 'Test'}},
    // { path: '**', redirectTo: '/error/404' },

    { path: '', loadChildren: () => import('./pages/content-pages/content-pages.module').then(m => m.ContentPagesModule)},

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
