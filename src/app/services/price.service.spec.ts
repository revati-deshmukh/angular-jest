import { TestBed } from '@angular/core/testing';

import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Add VAT', () => {
    it('should add VAT to the price', () => {
      const afterVatAmount = service.addVat(100);
      expect(afterVatAmount).toBe(123)
    });
  });

  describe('Remove VAT', () => {
    it('should remove VAT from the price', () => {
      const afterVatAmount = service.removeVat(100);
      expect(afterVatAmount).toBe(81.30)
    });
  })

  describe('Zero Values', () => {
    it('should retun 0 if price is 0', () => {
      const afterVatAmount = service.addVat(0);
      expect(afterVatAmount).toBe(0)
    });

    it('should return 0 when removing VAT from 0', () => {
      expect(service.removeVat(0)).toBe(0);
    });
  });

  describe('Decimal Values', () => {
    it('should add VAT correctly for decimal values', () => {
      expect(service.addVat(10.50)).toBeCloseTo(12.915);
    });

    it('should remove VAT correctly for decimal values', () => {
      expect(service.removeVat(12.915)).toBeCloseTo(10.50);
    });
  });

  describe('Large Values', () => {
    it('should add VAT correctly for large values', () => {
      expect(service.addVat(1000000)).toBeCloseTo(1230000);
    });

    it('should remove VAT correctly for large values', () => {
      expect(service.removeVat(1230000)).toBeCloseTo(1000000);
    });
  });

  describe('Negative Values', () => {
    it('should add VAT correctly for negative values', () => {
      expect(service.addVat(-100)).toBeCloseTo(-123);
    });

    it('should remove VAT correctly for negative values', () => {
      expect(service.removeVat(-123)).toBeCloseTo(-100);
    });
  });
});



