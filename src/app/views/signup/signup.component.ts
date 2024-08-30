import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../services/route-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { CommonService } from '../../services/common.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private utils:UtilService,
    private commonService: CommonService,
    private routeService:RouteServiceService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],   

      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],   

      password: ['', [Validators.required, Validators.minLength(2)]],
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
    if (this.signupForm.valid) {
    
        console.log(this.signupForm);
       
        this.commonService.signup(this.signupForm.value).subscribe((response:any) => {
          if(this.utils.isSuccess(response.statusCode)){  
            // this.utils.showSuccess(Messages.TITLE_INFO, Messages.USER_INFO_SAVED_SUCCESSFULLY);
            
          }else if (response.statusCode == 'ADV-404') {
            this.utils.showWarning('Warning', response.message);
          } else if (response.statusCode === 'ADV-001' || response.statusCode === 'ADV-000') {
            this.utils.showSuccess('Success', response.message);
            
          }else{
            this.utils.showError(response.message);
          }
          
          this.utils.overlay('h');
        });
      
      console.log('Form submitted successfully');
    } else {
      this.utils.showError(this.signupForm.errors);
    }
  }

 

}
