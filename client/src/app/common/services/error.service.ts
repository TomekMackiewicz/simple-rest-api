import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    prepareError(errorResponse: HttpErrorResponse) {
        let errors: any = {};

        // First check for form errors
        if (typeof errorResponse.error.form !== 'undefined' && Object.keys(errorResponse.error.form).length > 0) {
            let errorData = errorResponse.error.form.children;  
            errors.formErrors = [];        
            for (let key in errorData) {
                if (errorData[key].errors.length > 0) {
                    errors.formErrors[key] = [];
                    for (let key2 in errorData[key].errors) {
                        errors.formErrors[key].push(errorData[key].errors[key2])
                    }
                } else {
                    errors.formErrors[key] = null;
                }
            }

            return throwError(errors);
        }

        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            errors.message = errorResponse.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            errors.message = `Error Code: ${errorResponse.status}\nMessage: ${errorResponse.message}`;
        }

        return throwError(errors);
    };

    handleError(errors: any, form: any)
    {
        // Form errors
        if (typeof errors.formErrors !== 'undefined' && Object.keys(errors.formErrors).length > 0) {
            Object.entries(errors.formErrors).forEach(([key, value]) => {
                Object.entries(value).forEach(([key2, value2]) => {
                    form.controls[key].setErrors({[value2]: true});
                });
            });

            return;
        }

        return errors.message;
    }
}
