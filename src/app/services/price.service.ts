import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor() { }

  addVat(price: number): number {
    return price * 1.23;
  }

  removeVat(price: number): number {
    return Math.round((price / 1.23) * 100) / 100;
  }
}
