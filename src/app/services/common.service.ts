import { Injectable } from '@angular/core';
import { ApiUrlService } from './api-url.service';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 

  constructor(private apiUrl : ApiUrlService, private baseService : BaseService,private router: Router,){}


    
  signup(payload : any){
    return this.baseService.postCall(this.apiUrl.POST_REGISTER_USER, payload, sessionStorage.getItem('token'));
  }
  getUserProfile(token: any){
    return this.baseService.getCallWithToken2(this.apiUrl.GET_USER_PROFILE,token);
  }
  updateProfileInfo(payload : any){
    return this.baseService.postCall(this.apiUrl.POST_UPDATE_USER_INFO, payload, sessionStorage.getItem('token'));
  }
  getUserProfileByID(userId:any){
    return this.baseService.getCallWithToken2(this.apiUrl.GET_USER_PROFILE_BY_ID +userId, sessionStorage.getItem('token'));

  }

 
  // getCompany(){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_COMPANY, sessionStorage.getItem('token'));
  // }
  // getCompanyUnderLocation(shopId:number){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_COMPANY_UNDER_LOCATION + shopId, sessionStorage.getItem('token'));
  // }

  // getCompanyList(){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_COMPANY_LIST, sessionStorage.getItem('token'));
  // }

  // getInfoList(payload:any){
  //   return this.baseService.postCall(this.apiUrl.GET_INFO_LIST, payload, sessionStorage.getItem('token'));
  // }
  // getAppList(){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_APP_LIST, sessionStorage.getItem('token'));
  // }
 

  // getShopList(payload: any) {
  //   return this.baseService.postCall(
  //       this.apiUrl.POST_SHOP_LIST,
  //       payload,
  //       sessionStorage.getItem('token')
  //   ); 
  // }
    
  //   getbannerList(payload: any) {
  //     return this.baseService.postCall(
  //         this.apiUrl.POST_BANNER_LIST,
  //         payload,
  //         sessionStorage.getItem('token')
  //     );
  
    
  //   }


 

  // getRoles(companyId:number){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_USER_ROLES + companyId, sessionStorage.getItem('token'));
  // }
  // getEmpType(){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_EMP_TYPE, sessionStorage.getItem('token'));
  // }
  



  



  // getUserMenuRights(uid : any, token: any){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_USER_MENU_RIGHTS, token);
  // }

  // getViewProfile(uid : any){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_VIEW_PROFILE + uid,sessionStorage.getItem('token'));
  // }

  



  // viewPlanHistory(userId:any){
  //   return this.baseService.getCallWithToken2(this.apiUrl.GET_USER_PLAN_HISTORY +userId, sessionStorage.getItem('token'));

  // }

  // checkToken() {
  //   const correlationId =this.baseService.generateCorrelationId();
  //   sessionStorage.setItem('correlationId', correlationId);
  //   // console.log('corelation id is'+correlationId);
  //   let tokn = sessionStorage.getItem("token");
  //   if (tokn) {
  //     // console.log("found it");
   
  //     }
  //     else {
  //       this.router.navigateByUrl(`/login`);
  //     };
  //   }

}