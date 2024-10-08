import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { RequestInterceptor } from './interceptor/request-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    // Router configuration with hash location strategy
    provideRouter(routes, withHashLocation()),
    
    // HTTP Client configuration
    provideHttpClient(),
    
    // Provide HTTP Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    
    // Browser animations
    importProvidersFrom(BrowserAnimationsModule),
    
    // Toastr notifications
    importProvidersFrom(ToastrModule.forRoot()),
    
    // NgxSpinner module
    importProvidersFrom(NgxSpinnerModule),
    
    // Client hydration
    provideClientHydration()
  ]
};
