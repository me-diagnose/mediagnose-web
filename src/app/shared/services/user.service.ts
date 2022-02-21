import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {IUser} from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environment.mediagnoseAPI.url;

  constructor(private http: HttpClient) { }

  getUserData(): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.apiURL}/user`));
  }
}
