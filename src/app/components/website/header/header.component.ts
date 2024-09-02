import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../../services/route-service.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userRole: string | null | undefined ;
  firstName: string | null | undefined ;
  userProfile: string | null | undefined;
  //currentComponent: string = 'loginmodal';
  currentComponent: string = '';


  showUserInfo: boolean = false;
  isLoggedIn = false;
 

  errorMessage: string | null = null;
  constructor(private router: Router,
    private authService:AuthService,
    private routeService:RouteServiceService,
  ) {} 

  ngOnInit(): void {
    this.authService.checkLoginStatus();
   
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
     
   
    
  }
    
  goToPage(pagename:any){

   
    console.log(pagename)
    this.routeService.goToPage(pagename);
   
   }

   logout() {
  
    this.authService.logout();
  }

}
