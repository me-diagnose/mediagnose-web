import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ILink, IPaypalResponseResult, Rel} from '../interfaces/payment.interface';
import {firstValueFrom, map, Observable} from 'rxjs';
import {IAuthResponse} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.mediagnoseAPI.url;

  constructor(private http: HttpClient) {
  }

  async initiatePaypalPayment(): Promise<string | undefined> {
    return firstValueFrom(this.http.get<IPaypalResponseResult>(`${this.apiUrl}/payment/initiate`).pipe(
      map((response: IPaypalResponseResult) => response.links.find((link: ILink) => link.rel === Rel.APPROVE)?.href)
    ))
  }

  approvePayment(orderToken: string): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(`${this.apiUrl}/payment/approve?token=${orderToken}`);
  }
}
