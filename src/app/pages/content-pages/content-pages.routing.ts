import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogoutComponent} from './logout/logout.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from '../../authentication/auth-guard.service';
import {ErrorComponent} from './error/error.component';


const routes: Routes = [
    { path: 'logout', component: LogoutComponent},
    { path: 'entry', component: LoginComponent, data: {title: 'Login'}, canActivate: [AuthGuardService]},
    { path: '**',  pathMatch: 'full', component: ErrorComponent, }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ContentPagesRoutingModule { }
