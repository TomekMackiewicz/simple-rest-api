import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavItem } from './menu-list-item/model/nav-item';
import { NAV_ITEMS } from './menu-list-item/const/nav-items';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    @ViewChild('sidenav', {static: false}) sidenav: ElementRef;
    isLoggedIn: boolean = true;
    title: string = 'client';
    navItems: NavItem[] = NAV_ITEMS;

    constructor() {}

    // TODO: DRY!
    isLargeScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width > 720 ? true : false;
    }
}
