import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ContentPagesRoutingModule} from './content-pages.routing';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
      LogoutComponent, LoginComponent, ErrorComponent],
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContentPagesModule { }
