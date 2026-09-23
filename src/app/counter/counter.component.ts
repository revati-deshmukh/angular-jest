import { Component, output } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <button (click)="increment()">Increment</button>
  `,
  styles: ``
})
export class CounterComponent {

  readonly changed = output<number>();
  count = 0;
  
  increment() {
    this.count++;
    this.changed.emit(this.count);
  }
}
