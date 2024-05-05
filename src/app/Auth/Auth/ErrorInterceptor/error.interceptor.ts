import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        catchError(error => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 403) {
                    // Handle blocked user error
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Access Denied',
                    //     text: 'You have been blocked by the server'
                    // });
                    // Optionally, navigate to a different page
                    this.router.navigate(['/blocked']);
                } else if (error.status === 500) {
                    // Handle server errors
                    Swal.fire({
                        icon: 'error',
                        title: 'Server Error',
                        text: error.error.message||'An internal server error occurred'
                    });
                } else if (error.status === 400 || error.status === 404) {
                    // Handle client errors
                    Swal.fire({
                        icon: 'error',
                        title: 'Client Error',
                        text: error.error.message || 'Something went wrong on the client side'
                    });
                } else {
                    // Handle other types of errors
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.statusText || 'An unexpected error occurred'
                    });
                }
            } else {
                // Handle non-HTTP errors
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text:error.error.message|| 'An unexpected error occurred'
                });
            }
            return throwError(error);
        })
    );
  }
}
