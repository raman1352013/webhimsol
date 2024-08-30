import { Component } from '@angular/core';
import { RouteServiceService } from '../../services/route-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router,private routeService:RouteServiceService) {} 
    
  goToPage(pagename:any){

   
    console.log(pagename)
    this.routeService.goToPage(pagename);
   
   }

}
