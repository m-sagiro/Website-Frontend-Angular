import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ContactComponent],
    imports: [
        CommonModule,
        FormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        ReactiveFormsModule,
    ]
})
export class ContactModule { }
