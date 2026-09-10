import { TestBed } from '@angular/core/testing';

import { DiscountService } from './discount.service';

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate discount', () => {
    expect(service.getDiscount()).toBe(15);
  });
});
