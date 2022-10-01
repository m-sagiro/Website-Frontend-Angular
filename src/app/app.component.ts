import {Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, pipe, filter } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {AuthenticationService} from './authentication/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(
        private renderer: Renderer2, private router: Router, @Inject(DOCUMENT, ) private document: any,
        private element: ElementRef, public location: Location, private auth: AuthenticationService,
                 ) {}
    ngOnInit() {
        let rv;
        const ua = window.navigator.userAgent;
        const version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];

        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            rv = ua.indexOf('rv:');
        }
        if (version) {
            const body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }
        if (this.auth.isTokenExpired() && !this.auth.isRefreshtokenExpired()) {
            const refreshToken = localStorage.getItem('refresh_token');
            this.auth.refreshToken(refreshToken).subscribe();
        }

    }
}
