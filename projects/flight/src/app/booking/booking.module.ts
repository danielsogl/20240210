import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookingRoutingModule } from './booking-routing.module';
import {
  FlightBookingComponent,
  FlightEditComponent,
  FlightSearchComponent,
} from './feature-flight';
import { TicketEffects } from './logic-flight/+state/effects';
import { ticketFeature } from './logic-flight/+state/reducer';

import { FlightCardComponent, FlightFilterComponent } from './ui-flight';

import { FlightPipe } from './ui-flight/flight-pipe/flight.pipe';

@NgModule({
    imports: [
        CommonModule,
        BookingRoutingModule,
        ReactiveFormsModule,
        StoreModule.forFeature(ticketFeature),
        EffectsModule.forFeature([TicketEffects]),
        // UiFlightModule,
        FlightCardComponent,
        FlightFilterComponent,
        FlightPipe,
        FlightBookingComponent,
        FlightEditComponent,
        FlightSearchComponent,
    ],
})
export class BookingModule {}
