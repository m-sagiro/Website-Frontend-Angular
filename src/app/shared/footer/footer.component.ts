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
    show: boolean;

    constructor(private router: Router) {
        // getting current route
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.urlAfterRedirects;
                this.show = this.currentRoute !== '/home';
            }
        });
    }

    ngOnInit() { }
}
