import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CardComponent } from './card/card.component';
import { AvatarComponent } from './avatar/avatar.component';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ShoppingCartComponent,
    WelcomeComponent,
    UserProfileComponent,
    CardComponent,
    AvatarComponent,
    CounterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cart';

  user = {
    name: 'Revati',
  };

  parentValue = 0;
  onChanged(value: number) {
    this.parentValue = value;
  }

  completeCheckout(total: number): void {
    console.log('Checkout total:', total);
  }
}
