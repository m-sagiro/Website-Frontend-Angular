import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    test: Date = new Date();
    currentRoute: String;
    showHome: boolean;
    showBlog: boolean;
    showContact: boolean;
    showAbout: boolean;

    constructor(private router: Router) {
        // getting current route
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.urlAfterRedirects;
                this.showHome = this.currentRoute !== '/home';
                this.showBlog = this.currentRoute !== '/blog';
                this.showContact = this.currentRoute !== '/contact';
                this.showAbout = this.currentRoute !== '/about';
            }
        });
    }

    ngOnInit() { }
}
