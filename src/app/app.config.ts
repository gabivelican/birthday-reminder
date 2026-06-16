import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Necesar pentru NgZorro
import { provideHttpClient } from '@angular/common/http'; // Necesar pentru Fake API

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(), // Adăugat pentru animațiile NgZorro
    provideHttpClient()  // Adăugat pentru a comunica cu API-ul
  ]
};