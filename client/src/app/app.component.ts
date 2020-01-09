import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavItem } from './menu-list-item/model/nav-item';
import { NAV_ITEMS } from './menu-list-item/const/nav-items';
import { AuthGuard } from './common/guards/auth.guard';
import { UiService } from './common/services/ui.service';

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
        private translate: TranslateService,
        private authGuard: AuthGuard,
        private uiService: UiService
    ) {
        translate.setDefaultLang('en');
    }

    ngOnInit() {
        this.authGuard.loggedIn.subscribe((val: boolean) => {
            this.isLoggedIn = val;
        });
    }

    isLargeScreen() {
        return this.uiService.isLargeScreen();
    }

    useLanguage(language: string) {
        this.translate.use(language);
    }
}
