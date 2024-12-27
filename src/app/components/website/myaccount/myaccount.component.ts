import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteServiceService } from '../../../services/route-service.service';
import { MainService } from '../../../services/main.service';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { appPagesService } from '../../../services/app-pages.service';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { RoleServiceService } from '../../../services/role-service.service';
import { UtilService } from '../../../services/util.service';


@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyAccountComponent {
  userRole: string | null | undefined ;
  firstName: string | null | undefined ;
  userProfile: string | null | undefined;
  parsedUserProfile: any;

 


  constructor(private appPages:appPagesService,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private utils:UtilService,
    private roleService:RoleServiceService,
    private commonService:CommonService,
    private spinner:NgxSpinnerService
  ) {}


  ngOnInit(): void {
    // this.getUserProfile();
    this.getFromSesion();
  }

getFromSesion(){
  this.userProfile = sessionStorage.getItem('userResponse');
      console.log(this.userProfile);

      if (this.userProfile) {
        this.parsedUserProfile = JSON.parse(this.userProfile);
        this.firstName = this.parsedUserProfile.firstName;
        console.log(this.parsedUserProfile);
        console.log(this.firstName);
      }
      else {
        console.log('not found userprofile')
      }
}

logout(){
this.authService.logout();  
}
ngAfterViewInit(): void {
      
    
}



}
