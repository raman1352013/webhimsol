import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { RouteServiceService } from '../../services/route-service.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-headermain',
  standalone: true,
  imports: [],
  templateUrl: './headermain.component.html',
  styleUrl: './headermain.component.css'
})
export class HeadermainComponent {
    pchangeForm!: FormGroup;
  constructor(private router: Router,
     private authService:AuthService,
     private routeService:RouteServiceService,
 
     private utils:UtilService,
     private spinner: NgxSpinnerService,
     private fb: FormBuilder,
   ) {
    
   }
  logout() {
  
    this.authService.logout();
  }
}
