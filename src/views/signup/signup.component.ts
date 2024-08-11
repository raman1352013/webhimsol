import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../services/route-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private utils:UtilService,
    private routeService:RouteServiceService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],   

      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],   

      password: ['', [Validators.required, Validators.minLength(8)]],
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
      // Perform form submission logic here
      console.log('Form submitted successfully');
    } else {
      this.utils.showError(this.signupForm.errors);
    }
  }

}
