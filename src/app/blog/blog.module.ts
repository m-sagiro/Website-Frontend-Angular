import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import {RouterModule} from '@angular/router';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { BlogNewComponent } from './blog-new/blog-new.component';



@NgModule({
  declarations: [BlogComponent, BlogViewComponent, BlogNewComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BlogModule { }
