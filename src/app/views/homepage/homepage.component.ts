import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { BanerComponent } from "../../components/baner/baner.component";// import { AppPagesService } from '../../services/app-pages.service';
import { WorldcountComponent } from '../../components/worldcount/worldcount.component';
import { RouteServiceService } from '../../services/route-service.service';
import { AboutusComponent } from "../aboutus/aboutus.component";
import { ContactusComponent } from "../contactus/contactus.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { WhatwedoComponent } from "../whatwedo/whatwedo.component";
import { GalleryComponent } from "../gallery/gallery.component";



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BanerComponent, WorldcountComponent, AboutusComponent, ContactusComponent, FooterComponent, WhatwedoComponent, GalleryComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router,private routeService:RouteServiceService) {}



goToPage(pagename:any){
 this.routeService.goToPage(pagename);

}


}
