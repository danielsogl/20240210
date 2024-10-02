import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FlightFilter } from '../../logic-flight';
import { FlightPipe } from '../flight-pipe/flight.pipe';

@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FlightPipe],
})
export class FlightFilterComponent {
  @Input() set filter(filter: FlightFilter) {
    this.inputFilterForm.setValue(filter);
  }

  @Output() searchTrigger = new EventEmitter<FlightFilter>();

  protected inputFilterForm = this.formBuilder.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    urgent: [false],
  });

  protected selectedFilterControl = new FormControl(
    this.inputFilterForm.getRawValue(),
    {
      nonNullable: true,
    }
  );

  constructor(private formBuilder: NonNullableFormBuilder) {}

  protected triggerSearch(): void {
    this.searchTrigger.emit(this.inputFilterForm.getRawValue());
  }
}
