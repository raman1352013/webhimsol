import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeadermainComponent } from "../../components/headermain/headermain.component";

@Component({
  selector: 'app-defaultlayoutcomponent',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, HeadermainComponent],
  templateUrl: './defaultlayoutcomponent.component.html',
  styleUrl: './defaultlayoutcomponent.component.css'
})
export class DefaultlayoutcomponentComponent {

}
