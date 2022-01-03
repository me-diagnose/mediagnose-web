import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ErrorService} from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(!error.error.error || error.error.error !== 'SessionID parameter missing') {
          this.errorService.showError(error.error);
        }

        return throwError(() => console.log(error));
      }));
  }
}
