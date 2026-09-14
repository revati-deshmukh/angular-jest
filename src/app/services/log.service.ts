import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  info(message: string): void {
    console.info(message);
  }

  warning(message: string): void {
    console.warn(message);
  }

  error(message: string): void {
    console.error(message);
  }
}
