import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function prepareError(errorResponse: HttpErrorResponse) {
    var errors: any = {};
    var msg: string;

    // First check form errors
    if (typeof errorResponse.error.formErrors !== 'undefined') {
        return throwError(errorResponse.error);
    }

    if (errorResponse.error instanceof ErrorEvent) {
        // A client-side or network error occurred.
        errors.message = errorResponse.error.message;
    } else {
        // The backend returned an unsuccessful response code.
        msg = prepareErrorMessage(errorResponse.status);
        errors.message = `Error code: ${errorResponse.status}: ${msg}`;
    }

    return throwError(errors);
};

export function handleError(errors: any, form?: any)
{
    if (form === null) {
        return errors;
    }

    // Form errors
    if (typeof errors.formErrors !== 'undefined') {
        Object.entries(errors.formErrors).forEach(([key, value]) => {
            if (value !== null) {
                Object.entries(value).forEach(([errorKey, errorMessage]) => {
                    if (typeof form.controls[key] !== 'undefined') {
                        form.controls[key].setErrors({[errorMessage]: true});
                    }
                });
            }
        });

        return null;
    }

    return errors;
}

function prepareErrorMessage(status: number): string {
    switch(status) {
        case 400:  
            return 'Bad request';
        case 401: 
            return 'Unauthorized';
        case 403: 
            return 'Forbidden';
        case 404: 
            return 'Not found';
        case 405: 
            return 'Method not allowed';
        case 500:
            return 'Internal server error';
        case 502:
            return 'Bad gateway';
        case 503:
            return 'Service unavailable';
        case 504:
            return 'Gateway timeout';
        default:
            return 'Unknown error';
    } 
}
