import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage/homepage.component';
import {AboutComponent} from './about/about/about.component';
import {BlogComponent} from './blog/blog/blog.component';
import {BlogViewComponent} from './blog/blog-view/blog-view.component';
import {ContactComponent} from './contact/contact/contact.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: HomepageComponent, data: {title: 'Home'}},
    { path: 'about',             component: AboutComponent, data: {title: 'About'}},
    { path: 'blog',             component: BlogComponent, data: {title: 'Blog'}},
    { path: 'blog/:id',             component: BlogViewComponent, data: {title: 'Blog'} },
    { path: 'contact',             component: ContactComponent, data: {title: 'Contact'}},

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
