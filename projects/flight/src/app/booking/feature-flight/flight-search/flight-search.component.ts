import { CommonModule, JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  EnvironmentInjector,
  inject,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight, FlightFilter, injectTicketsFacade } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent,
    JsonPipe,
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();
  private readonly injector = inject(EnvironmentInjector);

  protected readonly fromValue = signal('London');
  protected readonly toValue = signal('San Francisco');

  searchValue = computed(() => {
    return {
      from: this.fromValue(),
      to: this.toValue(),
    };
  });

  protected filter = signal({
    from: 'London',
    to: 'San Francisco',
    urgent: false,
  });

  protected basket: WritableSignal<Record<number, boolean>> = signal({
    3: true,
    5: true,
  });

  protected searchString = computed(() => {
    const { from, to } = this.filter();
    return `Flight from ${from} to ${to}`;
  });

  fromString = computed(() => this.filter().from);
  toString = computed(() => this.filter().to);

  protected flights$ = this.ticketsFacade.flights$;

  // searchStringLogger = effect(() => {});

  constructor() {
    effect(() => {
      console.log(
        'Search string changed:',
        this.fromString(),
        untracked(() => this.toString())
      );
    });
  }

  protected search(filter: FlightFilter): void {
    this.filter.set(filter);

    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search(this.filter());

    effect(() => console.log('Search:', this.filter()), {
      injector: this.injector,
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
