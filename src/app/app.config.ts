import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withDebugTracing,
  withInMemoryScrolling,
  withRouterConfig
} from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,  withDebugTracing(),
    withInMemoryScrolling({scrollPositionRestoration: 'top'})
    ),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
