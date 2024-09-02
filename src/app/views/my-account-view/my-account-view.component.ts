import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/website/header/header.component";
import { FooterComponent } from "../../components/website/footer/footer.component";
import { MyAccoutComponent } from "../../components/website/my-accout/my-accout.component";

@Component({
  selector: 'app-my-account-view',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MyAccoutComponent],
  templateUrl: './my-account-view.component.html',
  styleUrl: './my-account-view.component.css'
})
export class MyAccountViewComponent {

}
