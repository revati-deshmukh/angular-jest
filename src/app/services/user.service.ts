import { Injectable } from '@angular/core';
import { LogService } from './log.service';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  constructor(private loggerService: LogService) {}

  async getUser(): Promise<string> {
    return Promise.resolve('Andrew');
    // throw new Error('Failed to fetch user');
  }

  saveUser() {
    this.loggerService.info('Saving user');
  }

  loadUsers(): User[] {
    return [
      { id: 1, name: 'Revati' },
      { id: 2, name: 'John' },
      { id: 3, name: 'Ameya' },
    ];
  }
}
