import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShoppingCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cart';
}
