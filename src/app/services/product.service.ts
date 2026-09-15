import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LogService } from './log.service';
import { DiscountService } from './discount.service';

export interface Product {
  id : number;
  name: string;
  price: number; 
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];

  constructor(
    private api: ApiService,
    private discountService: DiscountService,
    private loggerService: LogService,
  ) {}

  loadProducts() {
    return this.api.get('/products');
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.loggerService.info('Product added');
  }

  removeProduct(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
    this.loggerService.info('product removed');
  }

  updateQuantity(id: number, quantity: number) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      product.quantity = quantity;
    }
  }

  calculateSubtotal(): number {
    return this.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }

  calculateVat(): number {
    const subtotal = this.calculateSubtotal();
    const discount = this.discountService.getDiscount();
    const discountedTotal = subtotal - (subtotal * discount) / 100;

    return discountedTotal * 0.23;
  }

  calculateGrandTotal(): number {
    const subtotal = this.calculateSubtotal();
    const discount = this.discountService.getDiscount();
    const discountAmount = (subtotal * discount) / 100;
    const discountedTotal = subtotal - discountAmount;
    const vat = discountedTotal * 0.23;

    return discountedTotal + vat;
  }

  clearBasket() {
    this.products = [];
  }
}
