import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJob } from '../_models/job.interface';
import { IResponse } from '../_models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs(url:string|undefined): Observable<any> {
    console.log('HTTP request api/jobs');
    if(url==null){
      return this.http.get<IResponse>(`${environment.API_URL}/jobs`) .pipe(
        catchError(err => this.handleError(err))
      )
    }
    else{
      return this.http.get<IResponse>(url) .pipe(
        catchError(err => this.handleError(err))
      )
    }
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
