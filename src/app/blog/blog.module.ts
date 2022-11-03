import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import {RouterModule} from '@angular/router';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { BlogNewComponent } from './blog-new/blog-new.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BlogDeleteComponent } from './blog-delete/blog-delete.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';



@NgModule({
  declarations: [BlogComponent, BlogViewComponent, BlogNewComponent, BlogDeleteComponent, BlogEditComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FroalaEditorModule,
        FroalaViewModule
    ]
})
export class BlogModule { }
