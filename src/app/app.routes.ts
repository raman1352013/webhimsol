import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DefaultlayoutcomponentComponent } from './views/defaultlayoutcomponent/defaultlayoutcomponent.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { SignupComponent } from './views/signup/signup.component';
import { MyAccountViewComponent } from './views/my-account-view/my-account-view.component';
import { PersonnelInformationComponent } from './components/website/personnel-information/personnel-information.component';
import { MyvieweditprofileComponent } from './components/website/myvieweditprofile/myvieweditprofile.component';
import { UpcomingeventsComponent } from './components/website/upcomingevents/upcomingevents.component';
import { MarketplaceComponent } from './components/website/marketplace/marketplace.component';
import { WebdashboardComponent } from './components/webUsersComponents/webdashboard/webdashboard.component';
import { WebServicesComponent } from './components/webUsersComponents/web-services/web-services.component';
import { TreeTypesComponent } from './components/webUsersComponents/tree-types/tree-types.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AddCoursesComponent } from './components/admin/add-courses/add-courses.component';

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
          { path: 'dashboard', component: WebdashboardComponent },
          { path: 'tree-types', component: TreeTypesComponent },
          { path: 'services', component: WebServicesComponent },
          { path: 'personalinfo', component: PersonnelInformationComponent },
          { path: 'viewprofile', component: MyvieweditprofileComponent },
          { path: 'upcomingevents', component: UpcomingeventsComponent },
          { path: 'settings', component: MyvieweditprofileComponent },
          { path: 'orderhistory', component:  MarketplaceComponent},
          { path: 'marketplace', component: MarketplaceComponent },
          
           { path: '', redirectTo: 'personalinfo', pathMatch: 'full' }
        ]
      },

      {
        path: 'defaultlayout',
        loadComponent: () => import('../app/views/defaultlayoutcomponent/defaultlayoutcomponent.component').then(m => m.DefaultlayoutcomponentComponent),
        children: [
          { path: 'dashboard', component: AddProductComponent },
          { path: 'addProduct', component: AddProductComponent },
          { path: 'add', component: AddCoursesComponent },
           { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
    ];

 
    