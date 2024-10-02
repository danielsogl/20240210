import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { getAuthToken } from '../../../shared/interceptors/auth.interceptor';
import { Flight, FlightFilter } from '../../logic-flight';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';
import { FlightFilterComponent } from '../../ui-flight/flight-filter/flight-filter.component';
import { TicketsFacade } from './../../logic-flight/+state/facade';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  standalone: true,
  imports: [
    NgIf,
    FlightFilterComponent,
    NgFor,
    FlightCardComponent,
    AsyncPipe,
    JsonPipe,
  ],
})
export class FlightSearchComponent {
  private readonly environment = inject(EnvironmentInjector);
  private readonly ticketsFacade = inject(TicketsFacade);

  private readonly token = getAuthToken();

  protected filter = {
    from: 'London',
    to: 'New York',
    urgent: false,
  };
  protected basket: Record<number, boolean> = {
    3: true,
    5: true,
  };
  protected flights$ = this.ticketsFacade.flights$;

  // constructor(private ticketsFacade: TicketsFacade) {}

  protected search(filter: FlightFilter): void {
    this.filter = filter;

    if (!this.filter.from || !this.filter.to) {
      return;
    }

    console.log('token', getAuthToken());

    runInInjectionContext(this.environment, () => {
      inject(TicketsFacade).search(filter);
    });
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true,
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
