import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuthResponse, IRegistration, IUser} from '../interfaces/user.interface';
import {BehaviorSubject, firstValueFrom, map, Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKeyName = environment.tokeyKeyName;
  private orderDateKeyName = environment.orderDateKeyName;
  private apiURL = environment.mediagnoseAPI.url;
  private isLoginSubject$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {
  }

  private _user: IUser;

  get user(): IUser {
    return this._user;
  }

  public login(username: string, password: string): Promise<IAuthResponse> {
    const urlRoute = `${this.apiURL}/auth/login`;
    return firstValueFrom(this.http.post<IAuthResponse>(urlRoute, {username, password}).pipe(tap((response: IAuthResponse) => {
      this.saveToken(response.accessToken);
      this.saveOrderDate(response.orderDate);
    })))
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.isLoginSubject$.asObservable();
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKeyName);
    localStorage.removeItem(this.orderDateKeyName);
    this.isLoginSubject$.next(false);
    this.router.navigate(['welcome']);
  }

  public register$(registrationInfo: IRegistration): Observable<boolean> {
    const urlRoute = `${this.apiURL}/auth/register`;
    return this.http.post<IAuthResponse>(urlRoute, registrationInfo).pipe(tap((response: IAuthResponse) => {
      if (!!response.accessToken) {
        this.saveToken(response.accessToken);
        this.saveOrderDate(response.orderDate);
      }
    }), map((response: any) => !!response.accessToken));
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKeyName, token);
    this.isLoginSubject$.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKeyName);
  }

  private saveOrderDate(orderDate: string): void {
    localStorage.setItem(this.orderDateKeyName, orderDate);
  }

}
