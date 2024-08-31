import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class appPagesService {
  constructor(private router : Router){
  }
  public static readonly PAGE_LOGIN = "/login";

  public static readonly PAGE_FORGOT_PASSWORD = "/forgotPassword";

  public static readonly PAGE_VERIFY_OTP = "/verifyOtp";

  public static readonly PAGE_DASHBOARD = "/home/dashboard";
  
  public static readonly PAGE_HOMEPAGE = "/home";
  public static readonly PAGE_VIEWPROFILE = "/view-profile";

  public goTo(page:any){
    this.router.navigate([page]);
     console.log("I am going to "+page);
  }
}
