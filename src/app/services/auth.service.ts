import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiUrlService } from './api-url.service';
import { BehaviorSubject } from 'rxjs';
import { RouteServiceService } from './route-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private apiUrl : ApiUrlService, 
    private baseService : BaseService,
  private routeService:RouteServiceService) {
     
     }
  
  getToken(payload : any){
    return this.baseService.postCallWithoutToken(this.apiUrl.GET_TOKEN, payload);
  }
  login(payload : any){
    return this.baseService.postCallWithoutToken(this.apiUrl.POST_LOGIN, payload);
  }
  register(payload : any,token:any){
    return this.baseService.postCall(this.apiUrl.POST_REGISTER, payload,token);
  }
  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  checkLoginStatus(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.setLoggedIn(true);
    } else {
      this.setLoggedIn(false);
    }
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.setLoggedIn(false);
    this.routeService.goToPage('homepage');
  }
}
