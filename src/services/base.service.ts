import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilService } from './util.service';
import { ApiUrlService } from './api-url.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http : HttpClient, private utils : UtilService, private apiUrl : ApiUrlService) { }

  httpOptionsWithoutToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  httpOptionsWithTokenForgot = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ` + sessionStorage.getItem('fToken'),
    }),
  };

  httpOptionsWithToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      //'authorization': `Bearer ` + sessionStorage.getItem('token'),
    }),
  };

  httpOptionsDocWithToken = {
    //'responseType': 'blob',
  //   const options = new RequestOptions({
  //     responseType: ResponseContentType.Blob
  // });
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      //'authorization': `Bearer ` + sessionStorage.getItem('token'),
    }),
    
  };
  httpOptionsDocWithToken1 = { 
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      //'authorization': `Bearer ` + sessionStorage.getItem('token'),
    }),
    observe: 'response' as 'body',
    responseType: 'blob' 
  }
  
  public postCallWithoutToken(url:any, request:any) : any{
    return this.http.post<any>(url, request, this.httpOptionsWithoutToken).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public postCallWithTokenForgot(url:any, request:any, fToken: any) : any{
    return this.http.post<any>(url, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ` + fToken,
      }),
    }).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public postCallWithTokenVerify(url:any, request:any, token: any) : any{
    return this.http.post<any>(url, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ` + token,
      }),
    }).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public postCall(url:any, request:any, token:any) : any{
    return this.http.post<any>(url, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        //'authorization': `Bearer ` + token,
      }),
    }).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public postCallDoc(url:any, request:any) : any{
    return this.http.post<any>(url, 'request', this.httpOptionsDocWithToken).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public fileUpload(url:any, request:any) : any{
    console.log(request);
    return this.http.post<any>(url, request).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public getCall(url:any) :any{
    return this.http.get<any>(url, this.apiUrl.HEADER_OPTIONS).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public getCallWithoutToken(url:any) :any{
    return this.http.get<any>(url, this.httpOptionsWithoutToken).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public getCallWithToken(url:any) :any{
    return this.http.get<any>(url, this.httpOptionsWithToken).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public getCallWithToken2(url:any,token:any) :any{
    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        //'authorization': `Bearer ` + token,
      }),
    }).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public getCallWithToken1(url:any,token: any) :any{
    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        //'Authorization': `Bearer ` + token,
      }),
    }).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public deleteCall(url:any) :any{
    return this.http.delete<any>(url, this.apiUrl.HEADER_OPTIONS).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public putCall(url:any) : any{
    return this.http.put<any>(url, this.apiUrl.HEADER_OPTIONS).pipe(retry(0), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public createReq(request:any){
    return {data:request};
  }
   
  public handleError(error: any) {
    let errorMessage = error.error.message;
    this.showError(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  
  showError(error : any){
    this.utils.showError(error);
    this.utils.overlay('h');
  }

}