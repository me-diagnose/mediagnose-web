import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRegistration, IUser} from '../interfaces/user.interface';
import {BehaviorSubject, firstValueFrom, map, Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';

const TOKEN_KEY_NAME = 'MD_Token';

interface IAuthResponse {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.mediagnoseAPI.url;
  private isLoginSubject$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {
  }

  private _user: IUser;

  get user(): IUser {
    return this._user;
  }

  public login(username: string, password: string): Promise<IAuthResponse> {
    const urlRoute = `${this.apiURL}/auth/login`;
    return firstValueFrom(this.http.post<IAuthResponse>(urlRoute, {username, password}).pipe(tap((response: IAuthResponse) => {
      this.saveToken(response.accessToken)
    })))
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.isLoginSubject$.asObservable();
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_KEY_NAME);
    this.isLoginSubject$.next(false);
  }

  public register$(registrationInfo: IRegistration): Observable<boolean> {
    const urlRoute = `${this.apiURL}/auth/register`;
    return this.http.post<IAuthResponse>(urlRoute, registrationInfo).pipe(tap((response: IAuthResponse) => {
      if (!!response.accessToken) {
        this.saveToken(response.accessToken)
      }
    }), map((response: any) => !!response.accessToken));
  }

  private saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY_NAME, token);
    this.isLoginSubject$.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY_NAME);
  }

}
