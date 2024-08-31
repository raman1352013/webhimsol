import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  constructor() { }

  getUserRole(): string | null {
    return sessionStorage.getItem('userRole'); // or wherever you store the role
  }

  hasRole(requiredRole: string): boolean {
    const userRole = this.getUserRole();
    return userRole === requiredRole;
  }
}
