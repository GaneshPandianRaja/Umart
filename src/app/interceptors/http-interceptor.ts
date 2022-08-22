import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
        } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            if (error.status > 500 || (error.status >= 300 && error.status < 400)) {
              this.router.navigate(['contact-support'])
            }
        }
        console.log(errorMsg);
        return throwError(error);
    })
    );
  }
}
