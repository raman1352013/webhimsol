import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { RoleServiceService } from './role-service.service';
import { appPagesService } from './app-pages.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private roleService: RoleServiceService,
    private utils: UtilService,
    private commonService:CommonService,
    private appPages: appPagesService
  ) {}

  getUserProfile(token: any) {
    this.commonService
      .getUserProfile(token)
      .subscribe((response: any) => { 
        //
        if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          
          //  this.appPages.goTo('homepage');
          
          console.log(response.response)
         
          sessionStorage.setItem('profileresponse', response.response);
          sessionStorage.setItem('userResponse', JSON.stringify(response.response.userProfile));
              const userProfile = response.response.userProfile;
             const userRole = userProfile.role;
            sessionStorage.setItem('userRole', userRole);
            sessionStorage.setItem('userid',userProfile.userId)

             if(this.roleService.hasRole('USER')){
              this.appPages.goTo('myaccountview');
             }else if (this.roleService.hasRole('ADMIN')){
              this.appPages.goTo('defaultlayout');
             }
             ;


          
        } else {
          this.utils.showError(response.message);
        }
        
      }
        
      }); 
  }
}
