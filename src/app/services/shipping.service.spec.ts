import { TestBed } from '@angular/core/testing';

import { ShippingService } from './shipping.service';

describe('ShippingService', () => {
  let service: ShippingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Happy paths', () => {
    it('should charge €10 for an order under €100', () => {
      expect(service.calculateShipping(50, false)).toBe(10);
    });
    
    it('should provide free shipping for an order over €100', () => {
      expect(service.calculateShipping(150, false)).toBe(0);
    });

    it('should provide free shipping for premium users', () => {
      expect(service.calculateShipping(50, true)).toBe(0);
    });

    it('should provide free shipping for premium users with an order over €100', () => {
      expect(service.calculateShipping(150, true)).toBe(0);
    });
  });

  describe('Boundary values', () => {
    it('should charge €10 for exactly €99.99', () => {
      expect(service.calculateShipping(99.99, false)).toBe(10);
    });

    it('should charge €10 for exactly €100', () => {
      expect(service.calculateShipping(100, false)).toBe(10);
    });

    it('should provide free shipping for exactly €100.01', () => {
      expect(service.calculateShipping(100.01, false)).toBe(0);
    });

    it('should provide free shipping for a premium user at exactly €100', () => {
      expect(service.calculateShipping(100, true)).toBe(0);
    });
  });
  describe('Edge cases', () => {
    it('should charge €10 for an order of €0', () => {
      expect(service.calculateShipping(0, false)).toBe(10);
    });

    it('should provide free shipping for a premium user with €0 order', () => {
      expect(service.calculateShipping(0, true)).toBe(0);
    });

    it('should provide free shipping for a very large order', () => {
      expect(service.calculateShipping(1000000, false)).toBe(0);
    });
  });
  describe('Invalid input', () => {
    it('should throw an error for a negative order total', () => {
      expect(() => {
        service.calculateShipping(-1, false);
      }).toThrow('Order total cannot be negative');
    });

    it('should throw an error for a large negative order total', () => {
      expect(() => {
        service.calculateShipping(-1000, false);
      }).toThrow('Order total cannot be negative');
    });

    it('should throw an error for a negative total even for a premium user', () => {
      expect(() => {
        service.calculateShipping(-50, true);
      }).toThrow('Order total cannot be negative');
    });
  });
});
