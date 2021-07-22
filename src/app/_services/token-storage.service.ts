import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
 import { IUser, IUserInfo } from '../_models/user.interface';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export  class  TokenStorageService {

   constructor() { }
  helper = new JwtHelperService();

   clearData(): void {
    window.localStorage.clear();
  }

   saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

   getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

   saveUser(user:IUserInfo): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

   getUser(): IUserInfo {
    return JSON.parse(localStorage.getItem(USER_KEY) as any) ;
  }
}
