import {
  Component,
  DestroyRef,
  OnInit,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { interval, switchMap } from 'rxjs';
import { FlightService } from '../../api-boarding';
import { initialFlight } from '../../logic-flight';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit {
  private readonly flightService = inject(FlightService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly counter = signal(0);

  readonly flightId = input.required({
    alias: 'id',
    transform: numberAttribute,
  });

  readonly flight = toSignal(
    toObservable(this.flightId).pipe(
      switchMap((id) => this.flightService.findById(id))
    ),
    {
      initialValue: initialFlight,
    }
  );

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false],
  });

  valueChanges = toSignal(this.editForm.valueChanges);
  statusChanges = toSignal(this.editForm.statusChanges);

  constructor() {
    effect(() => {
      const flight = this.flight();
      this.editForm.patchValue(flight);
    });

    effect(() => console.log(this.counter()));
  }

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log(value);
        this.counter.set(value);
      });
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
