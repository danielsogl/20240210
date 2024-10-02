import {
  Component,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { Flight, initialFlight } from '../../logic-flight';

interface FlightForm {
  id: FormControl<Flight['id']>;
  from: FormControl<Flight['from']>;
  to: FormControl<Flight['to']>;
  date: FormControl<Flight['date']>;
  delayed: FormControl<Flight['delayed']>;
}

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class FlightEditComponent implements OnChanges, OnInit {
  @Input() flight = initialFlight;
  @Input({ required: true, transform: numberAttribute }) id!: number;

  protected editForm = new FormGroup<FlightForm>({
    id: new FormControl(0, { validators: [], nonNullable: true }),
    from: new FormControl('', { nonNullable: true }),
    to: new FormControl('', { nonNullable: true }),
    date: new FormControl('', { nonNullable: true }),
    delayed: new FormControl(false, { nonNullable: true }),
  });

  // protected editForm = this.formBuilder.group({
  //   id: [0],
  //   from: [''],
  //   to: [''],
  //   date: [new Date().toISOString()],
  //   delayed: [false],
  // });

  constructor(
    private store: Store,
    private formBuilder: NonNullableFormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.store
      .select(routerFeature.selectRouteParams)
      .subscribe((params) => console.log(params));

    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    console.log(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'].previousValue !== changes['flight'].currentValue) {
      this.editForm.patchValue(this.flight);
    }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
