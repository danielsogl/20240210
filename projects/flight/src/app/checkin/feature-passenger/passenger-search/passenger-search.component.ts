import { Component, Inject } from '@angular/core';
import { Passenger, PassengerStore } from '../../logic-passenger';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-passenger-search',
    templateUrl: './passenger-search.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, RouterLink]
})
export class PassengerSearchComponent {
  firstname = '';
  lastname = 'Smith';
  passengers = this.store.passengerEntities;
  selectedPassenger?: Passenger;

  constructor(@Inject(PassengerStore) private store: InstanceType<typeof PassengerStore>) {}

  search(): void {
    if (!(this.firstname || this.lastname)) return;

    this.store.loadPassengers({
      firstName: this.firstname,
      name: this.lastname
    });
  }

  select(passenger: Passenger): void {
    this.selectedPassenger = this.selectedPassenger === passenger ? undefined : passenger;
  }
}
