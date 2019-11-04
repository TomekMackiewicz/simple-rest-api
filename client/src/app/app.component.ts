import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavItem } from './menu-list-item/model/nav-item';
import { NAV_ITEMS } from './menu-list-item/const/nav-items';
import { AuthGuard } from './common/guards/auth.guard';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    @ViewChild('sidenav', {static: false}) sidenav: ElementRef;
    isLoggedIn: boolean = false;
    title: string = 'client';
    navItems: NavItem[] = NAV_ITEMS;

    constructor(
        private authGuard: AuthGuard
    ) {}

    ngOnInit() {
        this.authGuard.loggedIn.subscribe((val: boolean) => {
            this.isLoggedIn = val;
        });
    }

    // TODO: DRY!
    isLargeScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width > 720 ? true : false;
    }
}
