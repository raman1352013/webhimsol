import { Component } from '@angular/core';
import { HeadermainComponent } from '../../components/headermain/headermain.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/website/header/header.component';

@Component({
  selector: 'app-defaultlayoutcomponent',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, HeadermainComponent],
  templateUrl: './defaultlayoutcomponent.component.html',
  styleUrl: './defaultlayoutcomponent.component.css'
})
export class DefaultlayoutcomponentComponent {

}
