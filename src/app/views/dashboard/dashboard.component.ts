import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/admin/sidebar/sidebar.component";
import { HeaderComponent } from '../../components/website/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
