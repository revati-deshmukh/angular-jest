import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  form!: FormGroup;

  categories =  ['Category 1', 'Category 2', 'Category 3']
  countries = [
    { code: 1, name: 'India' },
    { code: 2, name: 'Ireland' },
    { code: 3, name: 'USA' }
  ]

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      category: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    }) 
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
