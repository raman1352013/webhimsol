import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router, private utils: UtilService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          Channel: 'web'
        }
      });
    }

    
    // console.log('Intercepted request:', request);

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //  console.log('Response event:', event);
        }
      }),
      catchError(err => this.handleAuthError(err))
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.error('Handling error:', err);
    if (err.status === 401 || err.status === 403 || err.status === 0) {
      console.log('Unauthorized or Forbidden or Network error, redirecting to login...');
      this.router.navigateByUrl(`/homepage`);
      sessionStorage.clear();
      
      return of(err.message); 
    }
    return throwError(err);
  }
}
