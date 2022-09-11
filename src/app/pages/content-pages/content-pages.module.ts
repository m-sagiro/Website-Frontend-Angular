import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ContentPagesRoutingModule} from './content-pages.routing';



@NgModule({
  declarations: [
      LogoutComponent, LoginComponent],
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContentPagesModule { }
