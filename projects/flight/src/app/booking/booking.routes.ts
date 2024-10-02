import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { authGuard } from '../shared/logic-auth/auth/auth.guard';
import {
  FlightBookingComponent,
  FlightEditComponent,
  FlightSearchComponent,
} from './feature-flight';
import { TicketEffects } from './logic-flight/+state/effects';
import { ticketFeature } from './logic-flight/+state/reducer';
import { flightsResolverConfig } from './logic-flight/data-access/flight.resolver';

export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [provideState(ticketFeature), provideEffects([TicketEffects])],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full',
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full',
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            canMatch: [authGuard('michael', 'home')],
            component: FlightEditComponent,
            resolve: flightsResolverConfig,
          },
        ],
      },
    ],
  },
];

export default BOOKING_ROUTES;
