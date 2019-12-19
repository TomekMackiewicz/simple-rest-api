import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    constructor(
        private snackBar: MatSnackBar
    ) {}

    openSnackBar(message: string, state: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: [state]
        });
    }

    isLargeScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width > 720 ? true : false;
    }
}


