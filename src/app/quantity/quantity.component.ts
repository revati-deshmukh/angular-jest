import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-quantity',
  imports: [],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantityComponent),
      multi: true
    }
  ]
})
export class QuantityComponent implements ControlValueAccessor {
  value = 1;
  disabled = false;

  increase() {
    if(this.disabled)
      return;

    this.value++;
    this.onChange(this.value);
    this.onTouched();
  }
  
  decrease() {
    if(this.disabled)
      return;

    if(this.value > 1) {
      this.value --;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value = value;
    console.log("value ", value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
