import { Directive, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flight',
  standalone: true,
})
export class FlightPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}

@Directive({
  selector: '[foo]',
  standalone: true,
})
export class FooDirective {}
