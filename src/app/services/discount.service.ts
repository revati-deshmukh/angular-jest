import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor() {}

  getDiscountPercentage(): number {
    return 15;
  }

  calculateDiscount(subtotal: number): number {
    const discount = this.getDiscountPercentage();

    return (subtotal * discount) / 100;
  }
}
