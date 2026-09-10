import { Injectable } from '@angular/core';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private discountService: DiscountService) { }

  calculate(price: number): number {
    return price - this.discountService.getDiscount();
  }
}
