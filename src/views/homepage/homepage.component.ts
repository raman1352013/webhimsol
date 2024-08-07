import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { BanerComponent } from "../../components/baner/baner.component";// import { AppPagesService } from '../../services/app-pages.service';
import { WorldcountComponent } from '../../components/worldcount/worldcount.component';
import { RouteServiceService } from '../../services/route-service.service';
import { AboutusComponent } from "../aboutus/aboutus.component";
import { ContactusComponent } from "../contactus/contactus.component";



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BanerComponent, WorldcountComponent, AboutusComponent, ContactusComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router,private routeService:RouteServiceService) {}



goToPage(pagename:any){
 this.routeService.goToPage(pagename);

}


}
