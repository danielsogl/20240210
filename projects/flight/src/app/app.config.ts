import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { APP_ROUTES } from './app-routing.module';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { routerFeature } from './shared/logic-router-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideEffects(),
    provideState(routerFeature),
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      // withDebugTracing(),
      withComponentInputBinding()
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
};
