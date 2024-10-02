import {
  provideHttpClient,
  withInterceptors,
  withRequestsMadeViaParent,
} from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { bookingInterceptor } from '../interceptors/booking.interceptor';
import { TicketEffects } from './+state/effects';
import { ticketFeature } from './+state/reducer';

export function provideFlight(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(ticketFeature),
    provideEffects(TicketEffects),
    provideHttpClient(
      withInterceptors([bookingInterceptor]),
      withRequestsMadeViaParent()
    ),
  ]);
}
