import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogoutComponent} from './logout/logout.component';


const routes: Routes = [
    {path: 'logout', component: LogoutComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ContentPagesRoutingModule { }
