import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteServiceService {

  constructor(private router: Router) { }

  goToPage(pagename:any){
    console.log("I am going to "+pagename);
   if(pagename=="homepage"){
     this.router.navigate(['/homepage']);
   }else if(pagename=="login"){
     this.router.navigate(['/login'])
   }else if(pagename=="consultations"){
    this.router.navigate(['/consultations'])
  }
   else if(pagename=="signup"){
     this.router.navigate(['/signup'])
   }
   else if(pagename=="dashboard"){
     this.router.navigate(['/dashboard'])
   }
   
   else if(pagename=="defaultlayout"){
     this.router.navigate(['/defaultlayout'])
   }
   else if(pagename=="myaccountview"){
    this.router.navigate(['/myaccountview'])
  }
 }
}
