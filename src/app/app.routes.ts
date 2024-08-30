import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DefaultlayoutcomponentComponent } from './views/defaultlayoutcomponent/defaultlayoutcomponent.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { SignupComponent } from './views/signup/signup.component';

export const routes: Routes = [  
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'login', component: LoginComponent  },
     { path: 'dashboard', component: DashboardComponent },
     { path: 'signup', component: SignupComponent },
     { path: 'homepage', component: HomepageComponent },
     { path: 'defaultlayout', component: DefaultlayoutcomponentComponent },
    ];


    