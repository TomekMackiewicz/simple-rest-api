import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, 
         Event, 
         NavigationStart, 
         NavigationEnd, 
         NavigationCancel, 
         NavigationError 
} from '@angular/router';
import { LoaderService } from './loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent {
    isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading;
    routeChanged: boolean = false;
    
    constructor(
        private loaderService: LoaderService,
        private router: Router
    ) {
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.routeChanged = true;
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
//                    setTimeout(() => { 
                        this.routeChanged = false; 
//                    }, 200);
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
     
}
