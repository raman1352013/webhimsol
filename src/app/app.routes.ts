import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DefaultlayoutcomponentComponent } from './views/defaultlayoutcomponent/defaultlayoutcomponent.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { SignupComponent } from './views/signup/signup.component';
import { MyAccountViewComponent } from './views/my-account-view/my-account-view.component';
import { PersonnelInformationComponent } from './components/website/personnel-information/personnel-information.component';
import { MyvieweditprofileComponent } from './components/website/myvieweditprofile/myvieweditprofile.component';

export const routes: Routes = [  
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'login', component: LoginComponent  },
     { path: 'dashboard', component: DashboardComponent },
     { path: 'signup', component: SignupComponent },
     { path: 'homepage', component: HomepageComponent },
     
     { path: 'defaultlayout', component: DefaultlayoutcomponentComponent },
     {
        path: 'myaccountview',
        loadComponent: () => import('../app/views/my-account-view/my-account-view.component').then(m => m.MyAccountViewComponent),
        children: [
         
          { path: 'personalinfo', component: PersonnelInformationComponent },
          { path: 'viewprofile', component: MyvieweditprofileComponent },
           { path: '', redirectTo: 'personalinfo', pathMatch: 'full' }
        ]
      },
    ];


    