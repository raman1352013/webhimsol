import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { appPagesService } from '../../../services/app-pages.service';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
import { MainService } from '../../../services/main.service';
import { RoleServiceService } from '../../../services/role-service.service';
import { UtilService } from '../../../services/util.service';
import { Messages } from '../../../services/messages.service';

@Component({
  selector: 'app-myvieweditprofile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './myvieweditprofile.component.html',
  styleUrl: './myvieweditprofile.component.css'
})
export class MyvieweditprofileComponent implements OnInit{
  errorMessage: string | null = null;
  successMessage: string | null = null;
  public userDetails : any = "";

  //public user: any = '';
  user: any = {
    firstName: '',
    lastName: '',
   
    email: '',
    mobileNo: '',
    
    extraParams: {
      dob: '',
    tob: '',
    gender: '',
    
    birthplace: '',
    }
  };
  formdata = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',
    birthPlace: '',
    dob: '',
    tob: '',
    userId:''
  };

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
  this.getViewProfiledata();
}

  getViewProfiledata() {
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
          this.user = this.setUserInfo(response.response.userProfile);
          
          console.log(this.user);
      
          
        


          
        } else {
          this.utils.showError(response.message);
        }
        
      }
        
      }); 
  } else {
    console.log('userid not found in session storage.');
  }
    
}



setUserInfo(usr: any) {
  console.log('imsettign this as user')
  console.log( {
    userId: usr.userId,
    //userId: usr.id,
     role: usr.role,
    userName: usr.userName,
    email: usr.email,
    mobileNo: usr.mobileNo,
    firstName: usr.firstName,
    lastName: usr.lastName,
    
   extraParams:{
    dob:usr.extraParams?.dob,
    tob:usr.extraParams?.tob,
    birthplace:usr.extraParams?.birthplace,
    gender:usr.extraParams?.gender,

   }
   });
  return {
    
     userId: usr.userId,
    //userId: usr.id,
     role: usr.role,
    userName: usr.userName,
    email: usr.email,
    mobileNo: usr.mobileNo,
    firstName: usr.firstName,
    lastName: usr.lastName,
    
   extraParams:{
    dob:usr.extraParams?.dob,
    tob:usr.extraParams?.tob,
    birthplace:usr.extraParams?.birthplace,
    gender:usr.extraParams?.gender,

   }
    
    
  };
}

saveUserProfileInfo(){
  this.errorMessage="";
 // Initialize extraParams if it's undefined
 if (!this.user.extraParams) {
  this.user.extraParams = {};
}  
this.user.extraParams = { 
  ...this.user.extraParams,  // Merge any existing extra params
  dob: this.user.extraParams.dob || this.user.dob,        // Date of Birth
  gender: this.user.extraParams.gender || this.user.gender,  // Gender
  tob: this.user.extraParams.tob || this.user.tob,        // Time of Birth
  birthplace: this.user.extraParams.birthplace || this.user.birthplace, // Place of Birth
}
  console.log(this.user);
  if( true){
    console.log(this.user);
    this.spinner.show();
    this.commonService.updateProfileInfo(this.user).subscribe((response:any) => {
      if( response.statusCode === 'ADV-000'){  
        this.utils.showSuccess(Messages.TITLE_INFO, Messages.USER_INFO_SAVED_SUCCESSFULLY);
        this.successMessage = response.message;
      }else if (response.statusCode == 'ADV-404') {
        this.utils.showWarning('Warning', response.message);
      } else if (response.statusCode === 'ADV-001' ) {
        this.utils.showSuccess('Success', response.message);
        
        // this.closeAddEditUserModal();
      }else{
        this.utils.showError(response.message);
      }
      
      
    });
  }
  else { // Validation failed, isValid contains the error message
    
  }
  setTimeout(() => {
    this.spinner.hide();
    // alert('Signup successful');
  }, 1000)
}



}
