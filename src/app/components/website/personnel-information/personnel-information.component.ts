import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { appPagesService } from '../../../services/app-pages.service';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { MainService } from '../../../services/main.service';
import { RoleServiceService } from '../../../services/role-service.service';
import { UtilService } from '../../../services/util.service';


@Component({
  selector: 'app-personnel-information',
  standalone: true,
  imports: [],
  templateUrl: './personnel-information.component.html',
  styleUrl: './personnel-information.component.css'
})
export class PersonnelInformationComponent {
 
  public userDetails: any = {};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private appPages:appPagesService,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private utils:UtilService,
    private roleService:RoleServiceService,
    private commonService:CommonService,
    private spinner:NgxSpinnerService) {}
 


    ngOnInit(): void {
     this.getUserProfile();
      
    }

 getUserProfile() {
    console.log('my personnel info  running')
    const userId = sessionStorage.getItem('userid');
    console.log(userId)

        if (userId) {
  
    console.log('User ID:', userId);
    this.commonService
      .getUserProfileByID(userId)
      .subscribe((response: any) => { 
        //
        if (response.hasOwnProperty('statusCode')) {
        if (response.statusCode === 'ADV-000') {
          console.log(response.response)
          this.userDetails = response.response.userProfile;
          console.log('user details',this.userDetails);
          console.log('Type of response:', typeof response.response);
          console.log(this.userDetails);

          
        


          
        } else {
          this.utils.showError(response.message);
        }
        
      }
        
      }); 
  } else {
    console.log('userid not found in session storage.');
  }
    
}
  navigateToViewProfile() {
    this.router.navigate(['../viewprofile'], { relativeTo: this.route });
  }

}
