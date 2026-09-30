import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityComponent } from './quantity.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    QuantityComponent
  ],
  template: `
    <form [formGroup]="form">
      <app-quantity formControlName="quantity"></app-quantity>
    </form>
  `
})
class HostComponent {
  form = new FormGroup({
    quantity: new FormControl(5)
  });
}

describe('QuantityComponent', () => {
  let component: QuantityComponent;
  let fixture: ComponentFixture<QuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value when writeValue is called', () => {
    component.writeValue(5);

    expect(component.value).toBe(5);
  });

  it('should register the change callback', () => {
    const onChange = jest.fn();

    component.registerOnChange(onChange);

    component.increase();
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should call onTouched when the control is interacted with ', () => {
    const onTouched = jest.fn();

    component.registerOnTouched(onTouched);

    component.increase();
    expect(onTouched).toHaveBeenCalled();
  });

  it('should update disabled state', () => {
    component.setDisabledState(true);

    expect(component.disabled).toBe(true);
  });

  it('shoudl not increase when disabled', () => {
    const onChange = jest.fn();

    component.registerOnChange(onChange);
    component.setDisabledState(true);

    component.increase();

    expect(component.value).toBe(1);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should disable buttons when disabled', () => {
    component.setDisabledState(true);

    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');

    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(true);
  });

  it('should write FormControl value into the component', () => {
    const fixture = TestBed.createComponent(HostComponent);

    fixture.detectChanges();

    const quantityComponent = fixture.debugElement.query(By.directive(QuantityComponent)).componentInstance as QuantityComponent;

    expect(quantityComponent.value).toBe(5);
  });

  it('shoudl update FormControl when component value changes', () => {
    const fixture = TestBed.createComponent(HostComponent);

    fixture.detectChanges();

    const quantityComponent = fixture.debugElement.query(By.directive(QuantityComponent)).componentInstance as QuantityComponent;

    quantityComponent.increase();

    fixture.detectChanges();

    expect(fixture.componentInstance.form.controls.quantity.value).toBe(6);
  });
});
