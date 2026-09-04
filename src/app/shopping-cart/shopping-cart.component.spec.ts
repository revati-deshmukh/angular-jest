import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addToCart', () => {
    it('should add an item to the cart', () => {
      const item = component.shopItems[0];
      component.addToCart(item);
      expect(component.cartItems.length).toBe(1);
      expect(component.cartItems[0].title).toBe(item.title);
    });

    it('should add the item with quantity 1', () => {
      const item = component.shopItems[0];
      component.addToCart(item);
      expect(component.cartItems[0].quantity).toBe(1);
    });

    it('should not add the same item twice', () => {
      const item = component.shopItems[0];

      const alertSpy = jest
        .spyOn(window, 'alert')
        .mockImplementation(() => {});

      component.addToCart(item);
      component.addToCart(item);

      expect(component.cartItems.length).toBe(1);

      expect(alertSpy).toHaveBeenCalledWith(
        'This item is already added to the cart'
      );

      alertSpy.mockRestore();
    });
  });

  describe('removeCartItem', () => {
    it('should remove an item from the cart', () => {
      component.addToCart(component.shopItems[0]);
      component.addToCart(component.shopItems[1]);
      expect(component.cartItems.length).toBe(2);
      component.removeCartItem(0);
      expect(component.cartItems.length).toBe(1);
      expect(component.cartItems[0].title).toBe(component.shopItems[1].title);
    });
  });

  describe('quantityChanged', () => {
    it('should update the quantity', () => {
      const item = component.shopItems[0];
      component.addToCart(item);
      const input = document.createElement('input');
      input.value = '3';
      const event = { target: input } as unknown as Event;
      component.quantityChanged(event, item);
      expect(item.quantity).toBe(3);
    });

    it('should set quantity to 1 when quantity is zero', () => {
      const item = component.shopItems[0];
      component.addToCart(item);
      const input = document.createElement('input');
      input.value = '0';
      const event = { target: input } as unknown as Event;
      component.quantityChanged(event, item);
      expect(item.quantity).toBe(1);
    });

    it('should set quantity to 1 when quantity is negative', () => {
      const item = component.shopItems[0];
      component.addToCart(item);
      const input = document.createElement('input');
      input.value = '-5';
      const event = { target: input } as unknown as Event;
      component.quantityChanged(event, item);
      expect(item.quantity).toBe(1);
    });
  });

  describe('cartTotal', () => {
    it('should calculate the total correctly', () => {
      component.addToCart(component.shopItems[0]);
      component.addToCart(component.shopItems[1]);
      component.cartItems[0].quantity = 2;
      component.cartItems[1].quantity = 3;
      expect(component.cartTotal).toBe(70);
    });
  });

  describe('purchaseClicked', () => {
    it('should show the purchase message', () => {
      const alertSpy = jest
        .spyOn(window, 'alert')
        .mockImplementation(() => {});

      component.purchaseClicked();

      expect(alertSpy).toHaveBeenCalledWith(
        'Thank you for your purchase'
      );

      alertSpy.mockRestore();
    });

    it('should empty the cart', () => {
      component.addToCart(component.shopItems[0]);
      component.addToCart(component.shopItems[1]);
      expect(component.cartItems.length).toBe(2);
      component.purchaseClicked();
      expect(component.cartItems.length).toBe(0);
    });

    it('should reset the cart total to zero', () => {
      component.addToCart(component.shopItems[0]);
      component.purchaseClicked();
      expect(component.cartTotal).toBe(0);
    });
  });

  describe('template', () => {
    it('should display shop items', () => {
      const items = fixture.nativeElement.querySelectorAll('.shop-item');
      expect(items.length).toBe(component.shopItems.length);
    });

    it('should display added cart items', () => {
      component.addToCart(component.shopItems[0]);
      fixture.detectChanges();
      const rows = fixture.nativeElement.querySelectorAll('.cart-row');
      expect(rows.length).toBe(1);
    });

    it('should display the cart total', () => {
      component.addToCart(component.shopItems[0]);
      fixture.detectChanges();
      const total = fixture.nativeElement.querySelector('.cart-total-price');
      expect(total.textContent.trim()).toBe('$20.00');
    });
  });

});
