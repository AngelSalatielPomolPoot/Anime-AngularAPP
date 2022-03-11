import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token:string=sessionStorage.getItem('token');
    let req=request;
    if (token) {
      request = req.clone({
        setHeaders: {
          token: token 
        }
      });
    }

    
    return next.handle(request);
  }
}
