import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { APP_ROUTES } from './app-routing.module';
import { routerFeature } from './shared/logic-router-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideEffects(),
    provideState(routerFeature),
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ],
};
