import {
  Component,
  OnChanges,
  SimpleChanges,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { FlightService } from '../../api-boarding';
import { initialFlight } from '../../logic-flight';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnChanges {
  // private readonly activatedRoute = inject(ActivatedRoute);
  private readonly flightService = inject(FlightService);

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

  // protected readonly flight$ = this.activatedRoute.paramMap.pipe(
  //   filter((params) => params.has('id')),
  //   map((params) => +params.get('id')!),
  //   switchMap((id) => this.flightService.findById(id))
  // );

  // private store = inject(Store);

  // @Input() flight = initialFlight;

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false],
  });

  constructor() {
    // this.store
    //   .select(routerFeature.selectRouteParams)
    //   .subscribe((params) => console.log(params));

    effect(() => {
      const flight = this.flight();
      this.editForm.patchValue(flight);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['flight'].previousValue !== changes['flight'].currentValue) {
    //   this.editForm.patchValue(this.flight);
    // }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
