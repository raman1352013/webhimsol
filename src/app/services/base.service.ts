import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { retry, catchError, shareReplay, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilService } from './util.service';
import { ApiUrlService } from './api-url.service';
// import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BaseService {

 
  constructor(private http : HttpClient, private utils : UtilService, private apiUrl : ApiUrlService) { }

  httpOptionsWithoutToken = {
     headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Channel-Id':'WEB',
      'project':'Test',
        'X-Correlation-Id': this.generateTransactionId(),
        'X-Transaction-Id': this.generateTransactionId(),
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
  
  public postCallWithoutTokenold(url:any, request:any) : any{
    
    return this.http.post<any>(url, request, this.httpOptionsWithoutToken).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public postCallWithTokenForgot(url:any, request:any, fToken: any) : any{
    return this.http.post<any>(url, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ` + fToken,
        'X-Channel-Id':'WEB',
        'X-Correlation-Id': this.generateTransactionId(),
        'X-Transaction-Id': this.generateTransactionId(),
      }),
    }).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public postCallWithTokenVerify(url:any, request:any, token: any) : any{
    return this.http.post<any>(url, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ` + token,
        'X-Channel-Id':'WEB',
        'X-Correlation-Id': this.generateTransactionId(),
        'X-Transaction-Id': this.generateTransactionId(),
      }),
    }).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }
   // Function to generate a random four-digit number
   private getRandomFourDigit(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // Function to get current time in milliseconds since Unix Epoch
  private getCurrentTimeMillis(): number {
    return Date.now();
  }
   // Function to generate Correlation ID
   public generateCorrelationId(): string {
    const timestamp = this.getCurrentTimeMillis();
    const randomDigits = this.getRandomFourDigit();
    return `WCO_${timestamp}_${randomDigits}`;
  }

  // Function to generate Transaction ID
  private generateTransactionId(): string {
    const timestamp = this.getCurrentTimeMillis();
    const randomDigits = this.getRandomFourDigit();
    return `WTX_${timestamp}_${randomDigits}`;
  }

  public postCall(url:any, request:any, token:any) : any{
   
    let correlationId = sessionStorage.getItem("correlationId");
    if (!correlationId) {
      // Provide a default value or handle the null case as needed
      
      correlationId = this.generateTransactionId();//insitu generated
    }
    
    const transactionId = this.generateTransactionId();
    // console.log('corelation id for api call'+correlationId)
    // console.log('transactionId id for api call'+transactionId)
    return this.http.post<any>(url, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'project':'Test',
        'X-Channel-Id':'WEB',
        'X-Correlation-Id': correlationId,
        'X-Transaction-Id': transactionId,
        'authorization': `Bearer ` + token,
      }),
    }).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public postCallDoc(url:any, request:any) : any{
    return this.http.post<any>(url, 'request', this.httpOptionsDocWithToken).pipe(retry(1), catchError(this.handleError.bind(this)), shareReplay(1));
  }

  public fileUpload(url:any, request:any) : any{
    // console.log(request);
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
    
    let correlationId = sessionStorage.getItem("correlationId");
    if (!correlationId) {
      // Provide a default value or handle the null case as needed
      correlationId = this.generateTransactionId();//insitu generated
    }
    
    const transactionId = this.generateTransactionId();
    // console.log('corelation id for api call'+correlationId)
    // console.log('transactionId id for api call'+transactionId)
    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Channel-Id':'WEB',
        'project':'TEST',
        'X-Correlation-Id': correlationId,
      'X-Transaction-Id': transactionId,
        'authorization': `Bearer ` + token,
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
   
  public handleErrorold(error: any) {
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

  public postCallWithoutTokenold1(url: any, request: any): any {
    return this.http.post<any>(url, request, this.httpOptionsWithoutToken)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => this.handleError(error)),
            shareReplay(1)
        );
}

public postCallWithoutToken(url: any, request: any): any {
  return this.http.post<any>(url, request, { ...this.httpOptionsWithoutToken, observe: 'response' })
      .pipe(
          retry(1),
          map((response: HttpResponse<any>) => {
              if (response.status === 200 || response.status === 206) {
                console.log('i am reading 200 code')
                  return response.body;  
              }
              else if (response.status === 260 ) {
                console.log('i am reading 260 code')
                throw new Error(`Unexpected status code: ${response.status}`);
              }else {
                  throw new Error(`Unexpected status code: ${response.status}`);
              }
          }),
          catchError((error: HttpErrorResponse) => this.handleError(error)),
          shareReplay(1)
      );
}

private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        console.log(`Status Code: ${error.status}`); // Here you can handle the status code as needed
    }

    // Check for CORS error (status 0)
    if (error.status === 0) {
      console.log('CORS Error: Possible cross-origin issue or network error.');
      errorMessage = 'A CORS error occurred. Please check your network connection or the server configuration.';
      this.utils.showError(errorMessage);
  }

    switch (error.status) { 
      case 260:
        console.log('260 code Success');
            break;

        case 400:
          this.utils.showError('Bad Request. Please check your input.');
            console.log('Bad Request');
            break;
        case 401:
            console.log('Unauthorized');
            break;
        case 403:
            console.log('Forbidden');
            break;
        case 404:
            console.log('Not Found');
            break;
        case 500:
            console.log('Internal Server Error');
            break;
        
        default:
            console.log('Something went wrong. Please try after sometime');
            break;
    }
    return throwError(errorMessage);
  }

}