import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class AboutModule { }
