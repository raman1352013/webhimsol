import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiUrl : ApiUrlService, private baseService : BaseService) { }

  login(payload : any){
    return this.baseService.postCallWithoutToken(this.apiUrl.POST_LOGIN, payload);
  }
}
