import { Component } from '@angular/core';
import { HeadermainComponent } from '../../components/headermain/headermain.component';
import { SidebarComponent } from '../../components/admin/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/website/header/header.component';
import { RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { appPagesService } from '../../services/app-pages.service';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { MainService } from '../../services/main.service';
import { RoleServiceService } from '../../services/role-service.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-defaultlayoutcomponent',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, HeadermainComponent,RouterModule],
  templateUrl: './defaultlayoutcomponent.component.html',
  styleUrl: './defaultlayoutcomponent.component.css'
})
export class DefaultlayoutcomponentComponent {
  constructor(private appPages:appPagesService,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private utils:UtilService,
    private roleService:RoleServiceService,
    private commonService:CommonService,
    private spinner:NgxSpinnerService
  ) {}

}
