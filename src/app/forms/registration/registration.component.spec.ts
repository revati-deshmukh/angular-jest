import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form exists', () => {
    expect(component.form).toBeTruthy();
  });

  it('should contain name, email and password fields', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  })

  it('should validate name, email and password fields', () => {
    component.form.get('name')?.setValue('');
    component.form.get('email')?.setValue('');
    component.form.get('password')?.setValue('');

    expect(component.form.get('name')?.valid).toBeFalsy();
    expect(component.form.get('email')?.valid).toBeFalsy();
    expect(component.form.get('password')?.valid).toBeFalsy();
  });

  it('should accept name', () => {
    component.form.get('name')?.setValue('ac');

    expect(component.form.get('name')?.hasError('minlength')).toBeTruthy();
  });

  it('should accept name', () => {
    component.form.get('name')?.setValue('abcd');

    expect(component.form.get('name')?.valid).toBeTruthy();
  });

  it('should show email validation error', () => {
    component.form.get('email')?.setValue('abcd');

    expect(component.form.get('email')?.hasError('email')).toBeTruthy();
  })

  it('should accept email', () => {
    component.form.get('email')?.setValue('abcd@example.com');

    expect(component.form.get('email')?.valid).toBeTruthy();
  });

   it('should show password validation error', () => {
    component.form.get('password')?.setValue('1234');

    expect(component.form.get('password')?.hasError('minlength')).toBeTruthy();
  })

  it('should accept password', () => {
    component.form.get('password')?.setValue('123456');

    expect(component.form.get('password')?.valid).toBeTruthy();
  });

  it('should validate form', () => {
    component.form.get('name')?.setValue('John');
    component.form.get('email')?.setValue('John@example.com');
    component.form.get('password')?.setValue('1234yh');
    component.form.get('category')?.setValue('Category 2');
    component.form.get('country')?.setValue(2);

    expect(component.form.valid).toBeTruthy();
  });

  it('shoudl log form value on submit when form is valid', () => {
    const logSpy = jest.spyOn(console, 'log');

    component.form.setValue({
      name: 'abc',
      email: 'abc@example.com',
      password: '123456',
      category: 'Category 1',
      country: 1
    });

    component.onSubmit();

    expect(logSpy).toHaveBeenCalledWith({
      name: 'abc',
      email: 'abc@example.com',
      password: '123456',
      category: 'Category 1',
      country: 1
    });
  });

  it('should have button displaying Register', () => {
    const btn = fixture.nativeElement.querySelector('button');

    expect(btn.textContent).toBe('Register');
  })

  it('should display category dropdown', () => {
    const dropdown = fixture.nativeElement.querySelector('select[formControlName="category"]');

    expect(dropdown).toBeTruthy();
  });

  it('should have 3 categories in dropdown', () => {
    const dropdown = fixture.nativeElement.querySelector('select[formControlName="category"]');

    const options = dropdown.querySelectorAll('option');
    expect(options.length).toBe(3);
    expect(options[0].textContent.trim()).toBe('Category 1');
  });


  it('should have 3 categories in dropdown', () => {
    const dropdown = fixture.nativeElement.querySelector('select[formControlName="category"]');

    const optionValues = dropdown.querySelectorAll('option');
    
    expect(optionValues[0].value).toBe('Category 1');
    expect(optionValues[1].value).toBe('Category 2');
    expect(optionValues[2].value).toBe('Category 3');
  });

  it('should validate category', () => {
    component.form.get('category')?.setValue('');

    expect(component.form.get('category')?.valid).toBeFalsy();
    expect(component.form.get('category')?.hasError('required')).toBeTruthy();
  });

  it('should update form control when category is selected', () => {
    const dropdown = fixture.nativeElement.querySelector('select[formControlName="category"]');

    dropdown.value = 'Category 3';
    dropdown.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    expect(component.form.get('category')?.value).toBe('Category 3');
  });

  it('should select category based on form control value', () => {
    component.form.get('category')?.setValue('Category 3');
    fixture.detectChanges();

    const dropdownValue = fixture.nativeElement.querySelector('select[formControlName="category"]')
    expect(dropdownValue.value).toBe('Category 3');
  });


  describe('Country select', () => {
    it('should have country dropdown', () => {
      const countrySelect = fixture.nativeElement.querySelector('select[formControlName="country"]');

      expect(countrySelect).toBeTruthy();
    });

    it('should have 3 countries', () => {
      const countrySelect = fixture.nativeElement.querySelector('select[formControlName="country"]');

      const options = countrySelect.querySelectorAll('option');
      expect(options.length).toBe(3);
      expect(options[0].textContent.trim()).toBe('India');
      expect(options[1].textContent.trim()).toBe('Ireland');
      expect(options[2].textContent.trim()).toBe('USA');
    });

    it('should show error if country is not selected', () => {
      component.form.get('country')?.setValue('');

      expect(component.form.get('country')?.hasError('required')).toBeTruthy();
    });

    it('should update form control when country is selected', () => {
      const countrySelect = fixture.nativeElement.querySelector('select[formControlName="country"]');
      const options = countrySelect.querySelectorAll('option');

      options[0].selected = true;

      countrySelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.form.get('country')?.value).toBe(1);
    });

    it('should display selected country based on form control', () => {
      component.form.get('country')?.setValue(3);

      fixture.detectChanges();

      const countrySelect = fixture.nativeElement.querySelector('select[formControlName="country"]');
      expect(countrySelect.selectedOptions[0].textContent.trim()).toBe('USA');
    });


  });
});
