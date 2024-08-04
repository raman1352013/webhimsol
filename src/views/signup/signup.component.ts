import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../services/route-service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router,private routeService:RouteServiceService) {}

  goToPage(pagename:any){
    this.routeService.goToPage(pagename);
   
   }

}
