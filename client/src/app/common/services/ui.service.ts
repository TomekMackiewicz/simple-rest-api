import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    message: string;
    buttonText: string;

    constructor(
        private translate: TranslateService,
        private snackBar: MatSnackBar,
        private capitalizeFirst: CapitalizeFirstPipe
    ) {
        this.translate.use(this.translate.currentLang) ? this.translate.currentLang : 'en';
    }

    async getMessage(message: string) {
        await this.translate.get(message).subscribe((text: string) => {
                this.message = this.capitalizeFirst.transform(text, []);
            }
        );
    }
    
    async getButtonText() {
        await this.translate.get('close').subscribe((text: string) => {
                this.buttonText = this.capitalizeFirst.transform(text, []);
            }
        );        
    }

    openSnackBar(message: string, state: string): void {
        this.getMessage(message);
        this.getButtonText();
        var settings = JSON.parse(localStorage.getItem("settings"));
        this.snackBar.open(this.message, this.buttonText, {
            duration: settings.notification_time_active.value*1000,
            verticalPosition: 'top',
            panelClass: [state]
        });
    }

    isLargeScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width > 720 ? true : false;
    }
}


