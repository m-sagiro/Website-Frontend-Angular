import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationInterceptorComponent } from './authentication-interceptor/authentication-interceptor.component';



@NgModule({
  declarations: [AuthenticationInterceptorComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
