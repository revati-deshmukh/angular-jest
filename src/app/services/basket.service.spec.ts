import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';
import { DiscountService } from './discount.service';

describe('BasketService', () => {
  let basketService: BasketService;
  let discountServiceMock = jest.Mocked<DiscountService>;

  beforeEach(() => {
    discountServiceMock = {
      getDiscount: jest.fn(),
    } as unknown as jest.Mocked<DiscountService>;

    TestBed.configureTestingModule({
      providers: [
        BasketService,
        {
          provide: DiscountService,
          useValue: discountServiceMock,
        },
      ],
    });
    basketService = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(basketService).toBeTruthy();
  });

  it('should calculate the price using the mocked discount', () => {
    discountServiceMock.getDiscount.mockReturnValue(15);
    // discountServiceMock.getDiscount();
    const result = basketService.calculate(100);
    expect(result).toBe(85);
  });

  it('should call getDiscount exactly once', () => {
    discountServiceMock.getDiscount.mockReturnValue(15);
    // discountServiceMock.getDiscount(15);
    basketService.calculate(100);
    expect(discountServiceMock.getDiscount).toHaveBeenCalled();
  });
});
