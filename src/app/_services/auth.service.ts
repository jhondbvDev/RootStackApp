import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IToken } from '../_models/token.interface';
import { IUser, IUserInfo } from '../_models/user.interface';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private tokenStorage:TokenStorageService) {}

   getAuth(authData: IUser): Observable<any> {
    console.log('HTTP request auth/login');
    return this.http.post<IToken>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      catchError(err => this.handleError(err))
    )
  
  }

   getUser():Observable<any>{
     console.log('HTTP request auth/me');
    return this.http.get<IUserInfo>(`${environment.API_URL}/auth/me`)
    .pipe(
      catchError(err => this.handleError(err))
    );
  }

  setUserInfo():void{
    this.getUser().subscribe(
      d => {
        this.tokenStorage.saveUser(d);
      },
      err => {
      }
    );
  }

  getCurrentUser():IUserInfo{
    return this.tokenStorage.getUser();
  }

  isLoggedIn():boolean{
     if(this.tokenStorage.getToken()!=null)
     {
       return true;
     }
     else
     {return  false; }
  }

  logout(): void {
    this.tokenStorage.clearData();
   }


  private handleError(err:any): Observable<never> {
    let errorMessage = 'An error occured retrieving data ';
    if (err) {
      errorMessage=`Error : code ${err.message}`;
     
    }
   console.log(errorMessage);
    return throwError(errorMessage);
  }
}
