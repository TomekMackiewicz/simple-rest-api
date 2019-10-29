import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function prepareError(errorResponse: HttpErrorResponse) {
    var errors: any = {};
    var msg: string;
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
        msg = prepareErrorMessage(errorResponse.status);
        errors.message = `Error code: ${errorResponse.status}: ${msg}`;
    }

    return throwError(errors);
};

export function handleError(errors: any, form: any)
{
    // Form errors
    if (typeof errors.formErrors !== 'undefined' && Object.keys(errors.formErrors).length > 0) {
        Object.entries(errors.formErrors).forEach(([key, value]) => {
            Object.entries(value).forEach(([key2, value2]) => {
                form.controls[key].setErrors({[value2]: true});
            });
        });

        return null;
    }

    return errors;
}

function prepareErrorMessage(status: number): string {
    switch(status) {
        case 400: { 
            return 'Bad request';
        }
        case 401: { 
            return 'Unauthorized';
        }
        case 403: { 
            return 'Forbidden';
        }
        case 404: { 
            return 'Not found';
        }
        case 405: { 
            return 'Method not allowed';
        }
        case 500: { 
            return 'Internal server error';
        }
//            case 502: { 
//                msg = 'Bad gateway';
//                break; 
//            }
//            case 503: { 
//                msg = 'Service unavailable';
//                break; 
//            }
//            case 504: { 
//                msg = 'Gateway timeout';
//                break; 
//            }
//            default: { 
//                msg = errorResponse.message;
//                break; 
//            } 
    } 
}

//import { Injectable } from '@angular/core';
//import { HttpErrorResponse } from '@angular/common/http';
//import { throwError } from 'rxjs';
//
//@Injectable({
//    providedIn: 'root'
//})
//export class ErrorService {
//    private msg: string;
//    private errors: any = {};
//
//    public prepareError(errorResponse: HttpErrorResponse) {
//        // First check for form errors
//        if (typeof errorResponse.error.form !== 'undefined' && Object.keys(errorResponse.error.form).length > 0) {
//            let errorData = errorResponse.error.form.children;  
//            this.errors.formErrors = [];        
//            for (let key in errorData) {
//                if (errorData[key].errors.length > 0) {
//                    this.errors.formErrors[key] = [];
//                    for (let key2 in errorData[key].errors) {
//                        this.errors.formErrors[key].push(errorData[key].errors[key2])
//                    }
//                } else {
//                    this.errors.formErrors[key] = null;
//                }
//            }
//
//            return throwError(this.errors);
//        }
//
//        if (errorResponse.error instanceof ErrorEvent) {
//            // A client-side or network error occurred.
//            this.errors.message = errorResponse.error.message;
//        } else {
//            // The backend returned an unsuccessful response code.
//        console.log(errorResponse.status);
//            this.msg = this.prepareErrorMessage(errorResponse.status);
//            this.errors.message = `Error code: ${errorResponse.status}: ${this.msg}`;
//        }
//
//        return throwError(this.errors);
//    };
//
//    public handleError(errors: any, form: any)
//    {
//        // Form errors
//        if (typeof errors.formErrors !== 'undefined' && Object.keys(errors.formErrors).length > 0) {
//            Object.entries(errors.formErrors).forEach(([key, value]) => {
//                Object.entries(value).forEach(([key2, value2]) => {
//                    form.controls[key].setErrors({[value2]: true});
//                });
//            });
//
//            return null;
//        }
//
//        return errors;
//    }
//
//    private prepareErrorMessage(status: number): string {
//        switch(status) {
//            case 400: { 
//                return 'Bad request';
//            }
//            case 401: { 
//                return 'Unauthorized';
//            }
//            case 403: { 
//                return 'Forbidden';
//            }
//            case 404: { 
//                return 'Not found';
//            }
//            case 405: { 
//                return 'Method not allowed';
//            }
//            case 500: { 
//                return 'Internal server error';
//            }
////            case 502: { 
////                msg = 'Bad gateway';
////                break; 
////            }
////            case 503: { 
////                msg = 'Service unavailable';
////                break; 
////            }
////            case 504: { 
////                msg = 'Gateway timeout';
////                break; 
////            }
////            default: { 
////                msg = errorResponse.message;
////                break; 
////            } 
//        } 
//    }
//}
