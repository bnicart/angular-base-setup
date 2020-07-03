import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { camelizeKeys } from '../utils/camelize-keys';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        // Already working... Uncomment when needed
        // 'Key-Inflection': 'camel'
      }
    });
    return next.handle(request)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 401) {
          this.toastr.warning('You are unauthorized to do this action!');
          this.authService.logout();
        }
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.data.errors.message}`;
        }
        this.toastr.error(errorMessage);
        return throwError(errorMessage);
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const modEvent = event.clone({body: camelizeKeys(event.body)});
          return modEvent;
        }
      })
    );
  }
}
