import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteServiceService } from '../../services/route-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router,private routeService:RouteServiceService) {}

  goToPage(pagename:any){
    this.routeService.goToPage(pagename);
   
   }
  

}
