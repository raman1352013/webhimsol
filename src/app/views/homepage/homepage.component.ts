import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { AboutusComponent } from '../../components/website/aboutus/aboutus.component';
import { BanerComponent } from '../../components/website/baner/baner.component';
import { ContactusComponent } from '../../components/website/contactus/contactus.component';
import { FooterComponent } from '../../components/website/footer/footer.component';
import { GalleryComponent } from '../../components/website/gallery/gallery.component';
import { HeaderComponent } from '../../components/website/header/header.component';
import { WhatwedoComponent } from '../../components/website/whatwedo/whatwedo.component';
import { WorldcountComponent } from '../../components/website/worldcount/worldcount.component';
import { RouteServiceService } from '../../services/route-service.service';
import { VisionComponent } from "../../components/website/vision/vision.component";
import { Footer2Component } from "../../components/website/footer2/footer2.component";
import { AchievementsComponent } from "../../components/website/achievements/achievements.component";
import { MissionComponent } from "../../components/website/mission/mission.component";


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BanerComponent, WorldcountComponent, AboutusComponent, ContactusComponent, FooterComponent, WhatwedoComponent, GalleryComponent, VisionComponent, Footer2Component, AchievementsComponent, MissionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router,private routeService:RouteServiceService) {}



goToPage(pagename:any){
 this.routeService.goToPage(pagename);

}


}
