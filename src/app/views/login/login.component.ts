import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../services/route-service.service';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
 import { AuthService } from '../../services/auth.service';
 import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { MainService } from '../../services/main.service';
import { UtilService } from '../../services/util.service';
import { CommonService } from '../../services/common.service';
import { RoleServiceService } from '../../services/role-service.service';

import { RecaptchaModule } from 'ng-recaptcha';
import { HeaderComponent } from "../../components/website/header/header.component";
// import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
// import { UtilService } from '../../services/util.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, RecaptchaModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: any = '';
  password: any = '';
 loginForm: FormGroup;
required: any;
captchaResponse: string | null = null;



  constructor(private fb: FormBuilder,
    private router: Router,
    private routeService:RouteServiceService,
    private authService:AuthService,
    private spinner: NgxSpinnerService,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private utils:UtilService,
    private roleService:RoleServiceService,
    private commonService:CommonService,
  
    ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      //username: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  authUser() {
    
    console.log('auth clicked');
    console.log(this.loginForm);
  
    if (this.loginForm.valid && this.captchaResponse) {
      this.spinner.show();
      const { username, password } = this.loginForm.value; // Correctly extract form values
  
     
      const payload = {
        username:username , // Use the extracted form value for username
        password:password , // Use the extracted form value for password
        currentTimeMillis: new Date().getTime(),
      };
      console.log(payload);
  
      this.authService.login(payload).subscribe(
        (response: any) => {

          
          console.log(response);
          if (response.hasOwnProperty('statusCode')) {
            if (response.statusCode === 'ADV-000') { // Check for successful response
             
              console.log(response);
              sessionStorage.setItem('loginresponse', response.response.token);
              sessionStorage.setItem('token', response.response.token);
              
               this.getUserProfile(response.response.token);
              this.authService.setLoggedIn(true);
               this.utils.showSuccess('Welcome ','Welcome user'); // Show success message
              
               

            } else {
              // this.utils.showError(response.message); // Show error message based on API response
              this.utils.showError(response.message);
            }
          }
        },
        (error: any) => {
          console.log('API Error:', error);
      
          if (error.status === 400) {
            this.utils.showError('Bad Request. Please check your input.');
          } else if (error.status === 401) {
            this.utils.showError('Unauthorized. Invalid credentials.');
          } else if (error.status === 403) {
            this.utils.showError('Forbidden. You don’t have permission to access this.');
          } else if (error.status === 404) {
            this.utils.showError('API not found. Please try again later.');
          } else if (error.status === 500) {
            this.utils.showError('Internal Server Error. Please try again later.');
          } else {
            this.utils.showError('Login failed. Please try again.');
          }
        }
      );
      
    } else {
      this.loginForm.markAllAsTouched(); // Trigger validation messages
    }

   setTimeout(() => {
    this.spinner.hide();
   }, 2000);
  }
  


  goToPage(pagename:any){
    console.log(pagename)
    this.routeService.goToPage(pagename);
   
   }
  
   getUserProfile(token: any) {
    this.mainService.getUserProfile(token);
   }

   onCaptchaResolved(captchaResponse: string | null): void {
    this.captchaResponse = captchaResponse;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    
  }

}
