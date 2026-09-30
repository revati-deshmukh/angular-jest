import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockUserService: any;

  beforeEach(async () => {
    mockUserService = {
      checkEmail: jest.fn().mockReturnValue(of(null)),
    }

    await TestBed.configureTestingModule({
      imports: [SignupComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with email and password fields', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should make email and password required', () => {
    component.form.get('email')?.setValue('');
    component.form.get('password')?.setValue('');

    expect(component.form.get('email').valid).toBeFalsy();
    expect(component.form.get('password').valid).toBeFalsy();
  });

  it('should validate email', () => {
    component.form.get('email')?.setValue('abcd');
  
    expect(component.form.get('email')?.hasError('email')).toBeTruthy();
  });

  it('should mark password invalid if length < 6', () => {
    component.form.get('password')?.setValue('123');
  
    expect(component.form.get('password')?.hasError('minlength')).toBeTruthy();
  });

  it('should be valid with correct email and password', () => {
    component.form.setValue({
      email: 'test@example.com',
      password: '123456'
    });

    expect(component.form.valid).toBeTruthy();
  });

  it('should log form value on submit when form is valid', () => {
    const logSpy = jest.spyOn(console, 'log');

    component.form.setValue({
      email: 'test@example.com',
      password: '123456'
    });

    component.onSubmit();
    expect(logSpy).toHaveBeenCalledWith('Form Submitted', {
      email: 'test@example.com',
      password: '123456',
    });
  });

  // it('should mark email as emailTaken from async validator', fakeAsync(() => {
  //   const emailControl = component.form.get('email');
  //   mockUserService.checkEmail.mockImplementation(() => {
  //     return () => of({ emailTaken: true });
  //   });
  //   fixture.detectChanges();

  //   emailControl?.setValue('taken@example.com');
  
  //   tick();
  //   fixture.detectChanges();
  //   expect(emailControl?.hasError('emailTaken')).toBe(true);
  //   expect(component.form.valid).toBe(false);
  // }));
});
