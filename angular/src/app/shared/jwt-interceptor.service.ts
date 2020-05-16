import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if(event instanceof HttpResponse){
        // nothing to do here
      }
    }, (err : any) => {
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          alert("Invalid login");
        }
      }
    }));
  }


}
