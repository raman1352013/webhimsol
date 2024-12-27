import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/auth.service';
import { RouteServiceService } from '../../../services/route-service.service';
import { UtilService } from '../../../services/util.service';
import { CommonModule } from '@angular/common';
import { HeroimageComponent } from "../heroimage/heroimage.component";

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [CommonModule, CommonModule, ReactiveFormsModule, HeroimageComponent],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {
  @ViewChild('changePassModal', { static: false }) changePassModal!: ElementRef;


openViewProfile() {
throw new Error('Method not implemented.');
}
openModel() {
throw new Error('Method not implemented.');
}

  userRole: string | null | undefined ;
  firstName: string | null | undefined ;
  userProfile: string | null | undefined;
  //currentComponent: string = 'loginmodal';
  currentComponent: string = '';
  modalInstance: bootstrap.Modal | undefined;

  parsedUserProfile: any;

  showUserInfo: boolean = false;
  isLoggedIn = false;
 

  errorMessage: string | null = null;

 
  pchangeForm!: FormGroup;

  constructor(private router: Router,
    private authService:AuthService,
    private routeService:RouteServiceService,

    private utils:UtilService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) {
    this.pchangeForm = this.fb.group({
      oldPassword: ['',[Validators.required, 
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      newPassword: ['', [Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
    });
    this.pchangeForm.get('newPassword')?.valueChanges.subscribe(value => {
      this.updateCriteria(value);
    });
  }
 
  updateCriteria(password: string) {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const digitCriteria = /\d/.test(password);
    const specialCriteria = /[@!#$%^&*+]/.test(password);

    const validConditions = [uppercaseCriteria, lowercaseCriteria, digitCriteria, specialCriteria].filter(Boolean).length >= 4;

    return {
      lengthCriteria,
      uppercaseCriteria,
      lowercaseCriteria,
      digitCriteria,
      specialCriteria,
      validConditions
    };
  }

  ngOnInit(): void {
    this.authService.checkLoginStatus();
   
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
     
   
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
  get cp() {
    return this.pchangeForm.controls;
  }
    
  goToPage(pagename:any){

   
    console.log(pagename)
    this.routeService.goToPage(pagename);
   
   }
  

   logout() {
  
    this.authService.logout();
  }

  onChangePassSubmit() {
    this.errorMessage = null;
    console.log(this.pchangeForm)
    if (this.pchangeForm.invalid) {
      this.pchangeForm.markAllAsTouched();
      return;
    }
    if (this.pchangeForm.valid ) {
      this.spinner.show();
     
      const { oldPassword, newPassword } = this.pchangeForm.value; 
  
     
      const payload = {
        oldPassword:oldPassword , 
        newPassword:newPassword , 
        currentTimeMillis: new Date().getTime(),
      };
      console.log(payload);
      const token =sessionStorage.getItem('token');
      
      this.authService.changePass(payload,token).subscribe(
        (response: any) => {
          
  
          if (response.hasOwnProperty('statusCode')) {
            if (response.statusCode === 'ADV-002') { 
            
              this.utils.showSuccess('success',response.message);
              this.closeChangePassModel();
              this.authService.logout();
              console.log(response);
              
            } else {
              
              this.errorMessage = response.message;
              this.utils.showError(response.message);
            }
          }
        },
        (error: any) => {
          console.log('API Error:', error);
          
         
        }
      );
    } else {
      this.pchangeForm.markAllAsTouched(); 
    }
  
    setTimeout(() => {
      this.spinner.hide();
      // alert('Signup successful');
    }, 1000)
    
  }

  
  closeModal() {
    
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = undefined;
    }
    
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
   
    
  }
  closeChangePassModel() {
    const modalElement = document.getElementById('changePassModal');
    
    // Check if the modal element exists before modifying its style
    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show'); // Ensure the 'show' class is removed
      modalElement.setAttribute('aria-hidden', 'true');
    }
  
    // Remove all modal backdrops
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
  }
  

  

}
