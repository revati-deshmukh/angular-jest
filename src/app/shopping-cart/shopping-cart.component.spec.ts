import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { CartItem, Product, ProductService } from '../services/product.service';
import { DiscountService } from '../services/discount.service';
import { PriceService } from '../services/price.service';
import { ShippingService } from '../services/shipping.service';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  let mockProductService: {
    loadProducts: jest.Mock;
  };

  let mockDiscountService: {
    getDiscount: jest.Mock;
  };

  let mockPriceService: {
    addVat: jest.Mock;
  };

  let mockShippingService: {
    calculateShipping: jest.Mock;
  };

  beforeEach(async () => {
    mockProductService = {
      loadProducts: jest.fn(),
    };

    mockDiscountService = {
      getDiscount: jest.fn().mockReturnValue(15),
    };

    mockPriceService = {
      addVat: jest.fn().mockImplementation((price) => price * 1.23),
    };

    mockShippingService = {
      calculateShipping: jest.fn().mockReturnValue(10),
    };

    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
        {
          provide: DiscountService,
          useValue: mockDiscountService,
        },
        {
          provide: PriceService,
          useValue: mockPriceService,
        },
        {
          provide: ShippingService,
          useValue: mockShippingService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty cart', () => {
    expect(component.cartItems()).toEqual([]);
  });

  describe('addToCart', () => {
    it('should add a product to the cart', () => {
      const product: Product = {
        id: 1,
        name: 'T-Shirt',
        price: 20,
        imageSrc: 'assets/cat.jpg',
      };

      component.addToCart(product);
      expect(component.cartItems()).toEqual([
        {
          id: 1,
          name: 'T-Shirt',
          price: 20,
          imageSrc: 'assets/cat.jpg',
          quantity: 1,
        },
      ]);
    });

    it('should not add the same product twice', () => {
      const product: CartItem = {
        id: 1,
        name: 'T-Shirt',
        price: 20,
        imageSrc: 'assets/cat.jpg',
      };

      component.addToCart(product);
      component.addToCart(product);
      expect(component.cartItems()).toHaveLength(1);
      expect(component.cartItems()[0].quantity).toBe(1);
    });
  });

  describe('removeCartItem', () => {
    it('should remove a product from the cart', () => {
      const product: CartItem = {
        id: 1,
        name: 'T-Shirt',
        price: 20,
        imageSrc: 'assets/cat.jpg',
      };

      component.addToCart(product);

      component.removeCartItem(1);

      expect(component.cartItems()).toHaveLength(0);
    });

    // it('should return if cartItem is empty', () => {
    //   component.removeCartItem(1);

    //   expect(component.cartItems()[0].quantity).toBe(1);
    // });
  });

  describe('updateQuantity', () => {
    it('should update product quantity', () => {
      const product: CartItem = {
        id: 1,
        name: 'T-Shirt',
        price: 20,
        imageSrc: 'assets/cat.jpg',
      };

      component.addToCart(product);
      component.updateQuantity(1, 3);

      expect(component.cartItems()[0].quantity).toBe(3);
    });

    it('should reset invalid product quantity', () => {
      const product: CartItem = {
        id: 1,
        name: 'T-Shirt',
        price: 20,
        imageSrc: 'assets/cat.jpg',
      };

      component.addToCart(product);
      component.updateQuantity(1, 0);

      expect(component.cartItems()[0].quantity).toBe(1);
    });

    it('should reset invalid product quantity', () => {
      const product: CartItem = {
        id: 1,
        name: 'T-Shirt',
        price: 20,
        imageSrc: 'assets/cat.jpg',
      };

      component.addToCart(product);
      component.updateQuantity(1, 0);

      expect(component.cartItems()[0].quantity).toBe(1);
    });

    it('should reset Nan quantity to 1', () => {
      const product: CartItem = {
        id: 1,
        name: 'T-Shirt',
        price: 20,
        imageSrc: 'assets/cat.jpg',
      };

      component.addToCart(product);
      component.updateQuantity(1, NaN);

      expect(component.cartItems()[0].quantity).toBe(1);
    });
  });

  describe('subtotal', () => {
    it('should calculate subtotal', () => {
      component.cartItems.set([
        {
          id: 1,
          name: 'T-Shirt',
          price: 20,
          imageSrc: 'assets/cat.jpg',
          quantity: 2,
        },
        {
          id: 2,
          name: 'Hoodie',
          price: 35,
          imageSrc: 'assets/bird1.jpg',
          quantity: 1,
        },
      ]);

      expect(component.subtotal()).toBe(75);
    });
  });

  describe('discount', () => {
    it('should calculate discount amount', () => {
      component.cartItems.set([
        {
          id: 1,
          name: 'T-Shirt',
          price: 100,
          imageSrc: 'assets/cat.jpg',
          quantity: 1,
        },
      ]);

      expect(component.discountPercentage.set(15));
      expect(component.discountAmount()).toBe(15);
      expect(component.discountedTotal()).toBe(85);
    });
  });

  describe('grand total', () => {
    it('should calculate grand total', () => {
      component.cartItems.set([
        {
          id: 1,
          name: 'T-Shirt',
          price: 100,
          imageSrc: 'assets/cat.jpg',
          quantity: 1,
        },
      ]);

      component.discountPercentage.set(10);

      mockPriceService.addVat.mockReturnValue(110.7);
      mockShippingService.calculateShipping.mockReturnValue(10);

      expect(component.grandTotal()).toBeCloseTo(120.7);
    });
  });

  describe('Template', () => {
    it('should display empty basket when cart is empty', () => {
      component.cartItems.set([]);
      fixture.detectChanges();

      const ele = fixture.nativeElement.querySelector('.empty-message');

      expect(ele).toBeTruthy();
      expect(ele.textContent).toContain('Your basket is empty');
    });

    it('should display cart items', () => {
      component.cartItems.set([
        {
          id: 1,
          name: 'T-Shirt',
          price: 20,
          imageSrc: 'assets/cat.jpg',
          quantity: 2,
        },
        {
          id: 2,
          name: 'Hoodie',
          price: 35,
          imageSrc: 'assets/bird1.jpg',
          quantity: 1,
        },
      ]);

      fixture.detectChanges();

      const elements = fixture.nativeElement.querySelectorAll('.cart-row');

      expect(elements).toHaveLength(2);
      expect(elements[0].textContent).toContain('T-Shirt');
      expect(elements[1].textContent).toContain('Hoodie');
    });
  });
});
