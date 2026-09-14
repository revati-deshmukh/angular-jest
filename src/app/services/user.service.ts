import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private loggerService: LogService) { }

  async getUser(): Promise<string> {
    return Promise.resolve('Andrew');
    // throw new Error('Failed to fetch user');
  }

  saveUser() {
    this.loggerService.info("Saving user");
  }
}
