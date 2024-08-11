import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../services/route-service.service';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
 import { AuthService } from '../../services/auth.service';
// import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
// import { UtilService } from '../../services/util.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,],
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
            } else {
              // this.utils.showError(response.message);
            }
          }
        },
        (error: any) => {
          console.log('API Error:', error);
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
