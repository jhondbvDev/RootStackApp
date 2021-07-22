import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
 import { SpinnerService } from '../_services/spinner.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,private spinnerService:SpinnerService) { }

  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.callSpinner();
    //TODO:Clear this part , it is to check the  spinner
  //   setTimeout(function () {
  //     console.log('timeout');
  //  }, 2000);
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      finalize(()=>this.spinnerService.stopSpinner())
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];