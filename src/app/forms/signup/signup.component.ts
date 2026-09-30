import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" />
      <input formControlName="password" type="password" />
      <button>Submit</button>
    </form>
  `,
  styles: ``
})
export class SignupComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        '', 
        [
          Validators.required, 
          Validators.email
        ]
      ],
      password: [
        '', 
        [
          Validators.required, 
          Validators.minLength(6)
        ]
      ]
    });
  }

  onSubmit() {
    console.log('Form Submitted', this.form.value);
  }
}
