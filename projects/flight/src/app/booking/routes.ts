import { Routes } from '@angular/router';
import { FlightEditComponent, FlightSearchComponent } from './feature-flight';
import { FlightResolver } from './logic-flight';

const BOOKING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature-flight/flight-booking/flight-booking.component'),
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
            component: FlightEditComponent,
            resolve: {
              flight: FlightResolver,
            },
          },
        ],
      },
    ],
  },
];

export default BOOKING_ROUTES;
