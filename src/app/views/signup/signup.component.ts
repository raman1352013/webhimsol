import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../services/route-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { CommonService } from '../../services/common.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { appPagesService } from '../../services/app-pages.service';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';
import { RecaptchaModule } from 'ng-recaptcha';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgxSpinnerModule,RecaptchaModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;
  
  captchaResponse: string | null = null;

  constructor(private fb: FormBuilder,
    private appPages:appPagesService,
    private mainService: MainService,
    private authService:AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private utils:UtilService,
    private commonService: CommonService,
    private routeService:RouteServiceService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],   

      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],   

      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;   

    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null   
 : { mismatch: true };
  }
  goToPage(pagename:any){
    this.routeService.goToPage(pagename);
   
   }

   onSubmit() {
    console.log(this.signupForm)
    
    if (this.signupForm.invalid) {
      alert('Fill the form');
      return;
    }
    if (this.signupForm.valid && this.captchaResponse) {
      this.spinner.show();
     
      const { firstName, mobile, password } = this.signupForm.value; // Correctly extract form values
  
     
      const payload = {
        firstName:firstName,
        lastName:this.signupForm.value.lastName,
        username:mobile , // Use the extracted form value for username
        password:password , // Use the extracted form value for password
        currentTimeMillis: new Date().getTime(),
        // email:mobile,
        role: "USER",
        mobileNo: mobile,
        mode: "SELF",
      };
      console.log(payload);
      const signuptoken =sessionStorage.getItem('signupToken');
      console.log('signuptoken'+signuptoken);
      this.authService.register(payload,signuptoken).subscribe(
        (response: any) => {
          
  
          if (response.hasOwnProperty('statusCode')) {
            if (response.statusCode === 'ADV-001') { 
              // this.loginFunction(payload);
              console.log(response);
              this.utils.showSuccess('Success','kindly login using your username and password');
              this.goToPage('login');
            } else {
              
              this.utils.showError(response.message);
            }
          }
        },
        (error: any) => {
          console.log('API Error:', error);
          
         
        }
      );
    } else {
      this.signupForm.markAllAsTouched(); 
    }
  

    setTimeout(() => {
      this.spinner.hide();
      // alert('Signup successful');
    }, 1000)

  }

  ngOnInit(): void {
    this.getToken();
   }

   getToken() {
   
    let payloadtoken = {
      clientId:"Lzf1wrUP24U1IPJYYlhfBBwPikl7y6sX",
  clientSecret:"Ll10zxNhUfChJ65YrEMe6WJagU5QDljD",
      // clientId: 'e28a8f22-bdee-4d2b-ace1-082ca8a0b129',
      // clientSecret: 'FsZagwDJJxbkeh09xrD9kMUUlwX1P6ve',
      currentTimeMillis: new Date().getTime(),
    };
    //const encObject3 = this.sharedService.encryptUsingAES256(payload);
    //this.reportsService.saveEventData(this.forgotPassForm).subscribe((response: any) => {
    this.authService.getToken(payloadtoken).subscribe((response: any) => {
      // const response = JSON.parse(
      //   this.sharedService.decryptUsingAES256(response2.response)
      // );
      console.log(response);
      if (this.utils.isSuccess(response.message)) {
        
        
        sessionStorage.setItem('signupToken', response.response.token);
       
        
       
      } else if (response.statusCode == 'ADV-404') {
        this.utils.showWarning('Warning', response.message);
      } else {
        this.utils.showError(response.message);
      }
      
    });
  }

  onCaptchaResolved(captchaResponse: string | null): void {
    this.captchaResponse = captchaResponse;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    
  }
}
