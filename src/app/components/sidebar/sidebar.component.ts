import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
type ImageMapping = {
  [key: string]: string;
};


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = false;

  menuList: { link: string, label: string }[] = [
    { link: '/dashboard', label: 'Dashboard' },
    { link: '/marketplace', label: 'marketplace' },
    { link: '/services', label: 'Services' },
    { link: '/defaultlayout/addProduct', label: 'AddProduct' },
    { link: '/defaultlayout/add', label: 'AddCourseCopy' },
    { link: '/orders', label: 'Orders' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openSidebar() {
    this.isSidebarOpen = true;
    // This method can be used if any additional functionality is needed on hover
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    // This method can be used if any additional functionality is needed on mouse leave
  }
  imageMapping: ImageMapping = {
    "Dashboard": "assets/img/dashboard.png",
    "bigmunch/#/user-management": "assets/img/user-management.png",
    "user-management": "assets/img/user-management.png",
    "bulk-upload": "assets/img/manage_licence.png",
    "bigmunch/#/pdms/meal-plan-management": "assets/img/pack.png",
    "meal-plan-management": "assets/img/pack.png",
    "bigmunch#/meal-plan-allocate": "assets/img/manage_licence.png",
    "order-history": "assets/img/order-history.png",
    "company-management": "assets/img/dashboard.png",
    "bigmunch/#/user-meal-allocate": "assets/img/user-management.png",
    "user-meal-allocate": "assets/img/pack.png",
    "homepage-management": "assets/img/manage_licence.png"
  };

  // Method to get the image path based on the link
  getImagePath(link: string): string {
    return this.imageMapping[link] || 'assets/img/dashboard.png'; // Fallback to default image if not found
  }
}


