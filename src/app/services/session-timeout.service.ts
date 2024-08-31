import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {
  private timeoutDuration = 10 * 60 * 1000; // 10 minutes
  private timeoutId: any;
  private events: string[] = ['mousemove', 'keydown', 'click'];

  constructor(private router: Router, private ngZone: NgZone) {
    this.startTimer();
    this.events.forEach(event => 
      window.addEventListener(event, () => this.resetTimer())
    );
  }

  private startTimer() {
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => this.logout(), this.timeoutDuration);
    });
  }

  private resetTimer() {
    clearTimeout(this.timeoutId);
    this.startTimer();
  }

  private logout() {
    this.router.navigate(['/homepage']);
    sessionStorage.clear();
    localStorage.clear();
  
  }
}
