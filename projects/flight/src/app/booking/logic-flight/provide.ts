import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TicketEffects } from './+state/effects';
import { ticketFeature } from './+state/reducer';

export function provideFlight(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(ticketFeature),
    provideEffects(TicketEffects),
  ]);
}
