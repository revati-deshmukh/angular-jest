import { Component, signal } from '@angular/core';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  template: `
    @if (error()) {
      <p>{{ error() }}</p>
    } @else {
      @for (user of users(); track user.id) {
        <p>{{ user.name }}</p>
      }
    }
  `,
  styles: ``
})
export class UserListComponent {
  readonly users = signal<User[]>([]);
  readonly error = signal('');

  constructor(private userService: UserService) {}

  ngOnInit() {
    try {
      this.users.set(this.userService.loadUsers());
    } catch (error) {
      this.error.set('Failed to load users');
    }
  }
}
