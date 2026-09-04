import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CartItem {
  title: string;
  price: number;
  imageSrc: string;
  quantity: number;
}
interface ShopItem {
  title: string;
  price: number;
  imageSrc: string;
}

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  shopItems: ShopItem[] = [
    { title: 'T-Shirt', price: 20, imageSrc: 'assets/cat.jpg' },
    { title: 'Coffee Cup', price: 10, imageSrc: 'assets/cat1.jpg' },
    { title: 'Hoodie', price: 35, imageSrc: 'assets/bird1.jpg' },
  ];
  cartItems: CartItem[] = [];
  get cartTotal(): number {
    return (
      Math.round(
        this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ) * 100,
      ) / 100
    );
  }
  addToCart(item: ShopItem): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.title === item.title,
    );
    if (existingItem) {
      alert('This item is already added to the cart');
      return;
    }
    this.cartItems.push({
      title: item.title,
      price: item.price,
      imageSrc: item.imageSrc,
      quantity: 1,
    });
  }
  removeCartItem(index: number): void {
    this.cartItems.splice(index, 1);
  }
  quantityChanged(event: Event, item: CartItem): void {
    const input = event.target as HTMLInputElement;
    const quantity = Number(input.value);
    if (isNaN(quantity) || quantity <= 0) {
      item.quantity = 1;
      return;
    }
    item.quantity = quantity;
  }
  purchaseClicked(): void {
    alert('Thank you for your purchase');
    this.cartItems = [];
  }
}
