import { Component } from '@angular/core';

@Component({
  selector: 'app-my-accout',
  standalone: true,
  imports: [],
  templateUrl: './my-accout.component.html',
  styleUrl: './my-accout.component.css'
})
export class MyAccoutComponent {
  userRole: string | null | undefined ;
  firstName: string | null | undefined ;
  userProfile: string | null | undefined;
  parsedUserProfile: any;


  ngOnInit(): void {
    // this.getUserProfile();
    this.getFromSesion();
  }

getFromSesion(){
  this.userProfile = sessionStorage.getItem('userResponse');
      console.log(this.userProfile);

      if (this.userProfile) {
        this.parsedUserProfile = JSON.parse(this.userProfile);
        this.firstName = this.parsedUserProfile.firstName;
        console.log(this.parsedUserProfile);
        console.log(this.firstName);
      }
      else {
        console.log('not found userprofile')
      }
}
}
