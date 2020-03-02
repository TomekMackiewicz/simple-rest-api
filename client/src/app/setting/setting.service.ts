import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HEADERS } from '../const/http';
import { Setting } from './setting';
import { prepareError } from '../common/functions/error.functions';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingService {

    constructor(
        private httpClient: HttpClient
    ) {}

    getSetting(name: string): Observable<Setting> {     
        return this.httpClient.get<Setting>(environment.admin_url+'/setting/'+name)
            .pipe(catchError(prepareError));
    }

    getSettings(): Observable<Setting> {     
        return this.httpClient.get<Setting>(environment.admin_url+'/setting/')
            .pipe(catchError(prepareError));
    }

    updateSetting(setting: Setting): Observable<any> {
        return this.httpClient.patch<any>(environment.admin_url+'/setting/'+setting.name, setting, { headers: HEADERS })
            .pipe(catchError(prepareError));
    }

}
