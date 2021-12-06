import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRegistration, IUser} from '../interfaces/user.interface';
import {BehaviorSubject, firstValueFrom, Observable, of, tap} from 'rxjs';

const TOKEN_KEY_NAME = 'MD_Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoginSubject$ = new BehaviorSubject<boolean>(this.hasToken());

  private _user: IUser;

  get user(): IUser {
    return this._user;
  }

  public login$(email: string, password: string): Promise<any> {
    return firstValueFrom(of({}).pipe(tap(() => {
      localStorage.setItem(TOKEN_KEY_NAME, 'SuTBk7JuVhWJJcXeSi80hQMmbTLh7Ws0qsoRIoadRNFZBY5NtoxP3jp6kjiR8BNdTFbLNRllIj8ErLOgcDV7qsXbKu0SFSK4FU80l7Yhr2DrHNjIAvh8FUGcxqDYlovqiPVCiXfKhfUcNnAcpHUjNWGjZi5iUiT3bpVYKucA0TM7S5QVWR6PkjCFBx7OuGRIzFcazgUwraS');
      this.isLoginSubject$.next(true);
    })))
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.isLoginSubject$.asObservable();
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_KEY_NAME);
    this.isLoginSubject$.next(false);
  }

  public register$(registrationInfo: IRegistration): Observable<any> {
    return of(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY_NAME);
  }

}
