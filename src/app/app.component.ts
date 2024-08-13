import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webhimsol';
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner() {
    this.spinner.show(undefined, {
      type: 'ball-scale-multiple',  // Spinner type
      size: 'large',                // Spinner size: small, medium, large
      bdColor: 'rgba(51,51,51,0.8)', // Background color
      color: '#fff',                // Spinner color
      fullScreen: true              // Whether the spinner covers the full screen
    });
  }

  hideSpinner() {
    this.spinner.hide();
  }
}
