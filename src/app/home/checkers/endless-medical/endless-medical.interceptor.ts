import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class EndlessMedicalInterceptor implements HttpInterceptor {
	private sessionKey = environment.endlessMedical.sessionKey;
	private apiKey = environment.endlessMedical.apiKey;

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const sessionId = localStorage.getItem(this.sessionKey);
		const endlessMedicalCheckerUrl = environment.endlessMedical.checkerUrl;

		const withParams: boolean = !!sessionId && request.url.includes('?');
		const sessionIdParam = withParams
			? `&SessionID=${sessionId}`
			: `?SessionID=${sessionId}`;

		if (request.url.includes(endlessMedicalCheckerUrl) && !!sessionId) {
			request = request.clone({ url: request.url + sessionIdParam });
		}

		request = request.clone({
			url: request.url,
			headers: request.headers.set('X-APIKEY', this.apiKey),
		});

		return next.handle(request);
	}
}
