import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  debugger: any;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const doctortoken=localStorage.getItem('doctorToken')
    const token=localStorage.getItem('Token')
    const adminToken=localStorage.getItem('adminToken')
    // const authrequest=request.clone({
    //   setHeaders:{
    //     Authorization:`Bearer ${token}`
    //   }
    // })
    // return next.handle(authrequest);
    if (token) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(newRequest);
    }

    if (doctortoken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${doctortoken}`),
      });
      return next.handle(newRequest);
    }

    if (adminToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${adminToken}`),
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
