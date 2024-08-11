import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import   
 { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,   

      ToastrModule.forRoot()
    ),
    
    { provide: ToastrService, useClass: ToastrService } ]
};
