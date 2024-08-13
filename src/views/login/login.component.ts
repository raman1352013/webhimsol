import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../services/route-service.service';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
 import { AuthService } from '../../services/auth.service';
 import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
// import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
// import { UtilService } from '../../services/util.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NgxSpinnerModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: any = '';
  password: any = '';
 loginForm: FormGroup;
required: any;


  constructor(private fb: FormBuilder,
    private router: Router,
    private routeService:RouteServiceService,
    private authService:AuthService,
    private spinner: NgxSpinnerService
  
    ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  authUser() {
    
    console.log('auth clicked');
    console.log(this.loginForm);
  
    if (this.loginForm.valid) {
      this.spinner.show(undefined, {
        type: 'ball-scale-ripple-multiple', // Choose from available types like 'ball-clip-rotate', 'square-jelly-box', etc.
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.7)',
        color: '#00ff00'
      });
      const { username, password } = this.loginForm.value; // Correctly extract form values
  
     
      const payload = {
        userName: username, // Use the extracted form value for username
        password: password, // Use the extracted form value for password
        currentTimeMillis: new Date().getTime(),
      };
  
      this.authService.login(payload).subscribe(
        (response: any) => {
          
  
          if (response.hasOwnProperty('statusCode')) {
            if (response.statusCode === 200) { // Add a condition to check for successful response
              sessionStorage.setItem('token', response.token);
              sessionStorage.setItem('roleId', response.userProfile.roleId);
              sessionStorage.setItem('roleDesc', response.userProfile.roleDesc);
              sessionStorage.setItem('userDetail', JSON.stringify(response.userDetail));
              
              // Navigate to dashboard or handle successful login here
              this.spinner.hide();
            } else {
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
              // this.utils.showError(response.message);
            }
          }
        },
        (error: any) => {
          console.log('API Error:', error);
          this.spinner.hide();
          // this.utils.overlay('h');
        //   this.utils.showError('Login failed. Please try again.'); // Show a user-friendly error message
        // }
        }
      );
    } else {
      this.loginForm.markAllAsTouched(); // Trigger validation messages
    }

   
  }
  
  


  goToPage(pagename:any){
    console.log(pagename)
    this.routeService.goToPage(pagename);
   
   }
  
  

}
