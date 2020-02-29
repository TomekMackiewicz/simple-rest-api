import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SettingService } from './setting.service';
import { UiService } from '../common/services/ui.service';
import { handleError } from '../common/functions/error.functions';
import { Setting } from './setting';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingComponent implements OnInit {
    
    setting: Setting;
    settings: Array<Setting> = [];
    userStartActiveForm = this.fb.group({
        value: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
    notificationTimeActiveForm = this.fb.group({
        value: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private settingService: SettingService,
        private uiService: UiService,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.settingService.getSettings().subscribe(
            (data: any) => {
                this.settings = data;
                this.ref.detectChanges();
            },
            error => {
                console.log(error); // TODO - handle error
            }
        );
    }

    updateSetting(value: any, status: string, setting: Setting) {
        if (typeof value === 'boolean') {
            value = value === true ? '1' : '0';
        }
        if (value === '' || status === 'INVALID') {
            return;
        }
        setting.value = value;
        
        // Update local storage
        var settingsFromStorage = JSON.parse(localStorage.getItem("settings"));
        settingsFromStorage[setting.name].value = value;
        localStorage.setItem("settings",JSON.stringify(settingsFromStorage));        
                
        return this.settingService.updateSetting(setting).subscribe(
            success => {
                this.uiService.openSnackBar(success, 'success-notification-overlay');
            },
            error => {
                let errors = handleError(error);
                if (errors !== null && typeof errors.message !== 'undefined') {
                    this.uiService.openSnackBar(errors.message, 'error-notification-overlay');
                }
                this.ref.detectChanges();
            }
        );
    }

}
