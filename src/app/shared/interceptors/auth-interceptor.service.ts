import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  tokenKeyName = environment.tokeyKeyName;
  apiURL = environment.mediagnoseAPI.url;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.tokenKeyName);

    if(request.url.includes(this.apiURL) && !request.url.includes('/auth') && token) {
      request = request.clone({setHeaders: {
          'x-access-token': token
        }});
    }

    return next.handle(request);
  }
}
