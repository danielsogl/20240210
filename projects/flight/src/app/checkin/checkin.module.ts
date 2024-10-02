import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckinRoutingModule } from './checkin-routing.module';
import { PassengerEditComponent, PassengerSearchComponent } from './feature-passenger';


@NgModule({
    imports: [
        CommonModule,
        CheckinRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PassengerEditComponent,
        PassengerSearchComponent
    ]
})
export class CheckinModule { }
