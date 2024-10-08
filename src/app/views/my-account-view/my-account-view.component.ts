import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/website/header/header.component";
import { FooterComponent } from "../../components/website/footer/footer.component";
import { MyAccoutComponent } from "../../components/website/my-accout/my-accout.component";
import { RouteServiceService } from '../../services/route-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';
import { MyAccountComponent } from "../../components/website/myaccount/myaccount.component";
import { Header2Component } from "../../components/website/header2/header2.component";

@Component({
  selector: 'app-my-account-view',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MyAccoutComponent, MyAccountComponent, Header2Component],
  templateUrl: './my-account-view.component.html',
  styleUrl: './my-account-view.component.css'
})
export class MyAccountViewComponent {

  userRole: string | null | undefined ;
  firstName: string | null | undefined ;
  userProfile: string | null | undefined;
  currentComponent: string = '';


  showUserInfo: boolean = false;
  isLoggedIn = false;
 
  errorMessage: string | null = null;
  constructor(private router: Router,
    private authService: AuthService,
    private utils:UtilService,
    private spinner: NgxSpinnerService,
    private routeService:RouteServiceService,
    
  ) {}


  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isLoggedIn) {
        // Retrieve the userProfile from sessionStorage
        this.userProfile = sessionStorage.getItem('userResponse');
        console.log(this.userProfile);
  
        // Check if userProfile is not null and parse it to an object
        if (this.userProfile) {
          const parsedUserProfile = JSON.parse(this.userProfile);
          this.firstName = parsedUserProfile.firstName;
          this.userRole = parsedUserProfile.userRole;
  
          // Log the parsed object and firstName for debugging
          console.log(parsedUserProfile);
          console.log(this.firstName);
        }
      }
    }, 2000); // The timeout value is 0ms, which means the code executes immediately after the current stack is cleared.
  }
}


