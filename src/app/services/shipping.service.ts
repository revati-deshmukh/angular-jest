import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor() { }

  calculateShipping(total: number, isPremium: boolean): number {
    if (total < 0) {
      throw new Error('Order total cannot be negative');
    }

    if (isPremium) {
      return 0;
    }

    if (total > 100) {
      return 0;
    }

    return 10;
  }
}
