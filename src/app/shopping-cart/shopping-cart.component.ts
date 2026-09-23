import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { CartItem, Product, ProductService } from '../services/product.service';
import { DiscountService } from '../services/discount.service';
import { PriceService } from '../services/price.service';
import { ShippingService } from '../services/shipping.service';



@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  readonly isPremium = input(false);

  readonly checkout = output<number>();

  readonly loading = signal(false);

  readonly cartItems = signal<CartItem[]>([]);

  readonly discountPercentage = signal(0);

  constructor(
    private productService: ProductService,
    private discountService: DiscountService,
    private priceService: PriceService,
    private shippingService: ShippingService,
  ) {}

  // shopItems: ShopItem[] = [
  //   { title: 'T-Shirt', price: 20, imageSrc: 'assets/cat.jpg' },
  //   { title: 'Coffee Cup', price: 10, imageSrc: 'assets/cat1.jpg' },
  //   { title: 'Hoodie', price: 35, imageSrc: 'assets/bird1.jpg' },
  // ];

  readonly subtotal = computed(() => {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  });

  readonly discountAmount = computed(() => {
    return (this.subtotal() * this.discountPercentage()) / 100;
  });

  readonly discountedTotal = computed(() => {
    return this.subtotal() - this.discountAmount();
  });

  readonly totalWithVat = computed(() => {
    return this.priceService.addVat(this.discountedTotal());
  });

  readonly shippingCost = computed(() => {
    return this.shippingService.calculateShipping(
      this.discountedTotal(),
      this.isPremium(),
    );
  });

  readonly grandTotal = computed(() => {
    return this.totalWithVat() + this.shippingCost();
  });

  readonly isEmpty = computed(() => {
    return this.cartItems().length === 0;
  });

  loadProducts(): void {
    this.loading.set(true);

    try {
      const products = this.productService.loadProducts();

      this.cartItems.set(products);
    } finally {
      this.loading.set(false);
    }
  }

  addToCart(item: Product): void {
    const existing = this.cartItems().find(
      (cartItem) => cartItem.id === item.id,
    );

    if (existing) {
      return;
    }

    this.cartItems.update((items) => [
      ...items,
      {
        ...item,
        quantity: 1,
      },
    ]);
  }

  removeCartItem(id: number): void {
    if (this.cartItems().length < 1) return;

    this.cartItems.update((items) => items.filter((item) => item.id !== id));
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0 || Number.isNaN(quantity)) {
      quantity = 1;
    }

    this.cartItems.update((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  applyDiscount(): void {
    this.discountPercentage.set(this.discountService.getDiscountPercentage());
  }

  checkoutClicked(): void {
    this.checkout.emit(this.grandTotal());
  }
}
