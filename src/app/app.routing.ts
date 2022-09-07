import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {HomepageComponent} from './homepage/homepage/homepage.component';
import {AboutComponent} from './about/about/about.component';
import {BlogComponent} from './blog/blog/blog.component';
import {BlogViewComponent} from './blog/blog-view/blog-view.component';
import {ContactComponent} from './contact/contact/contact.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: HomepageComponent },
    { path: 'about',             component: AboutComponent },
    { path: 'blog',             component: BlogComponent },
    { path: 'blog/:id',             component: BlogViewComponent },
    { path: 'contact',             component: ContactComponent },

    { path: 'home1',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent }
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
