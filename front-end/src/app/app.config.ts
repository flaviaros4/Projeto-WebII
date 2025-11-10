import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { authInterceptor } from './shared/services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
};
