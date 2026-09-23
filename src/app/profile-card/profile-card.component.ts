import { Component, computed, input, OnInit, output, signal } from '@angular/core';

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-profile-card',
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit {

  name: string = "John";
  email: string = "john@example.com"

  readonly title = input.required<string>();
  readonly saved = output<number>();
  readonly loading = signal(true);

  products = signal<Product[]>([
    {
      id: 1,
      name: 'Laptop'
    },
    {
      id: 2,
      name: 'Mouse'
    },
    {
      id: 3,
      name: 'Keyboard'
    }
  ]);

  readonly count = signal(0);

  readonly doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(value => value + 1);
  }

  ngOnInit(): void {
    this.loading.set(false);
  }

  save() {
      this.saved.emit(42);
  }
}
