import { TestBed } from '@angular/core/testing';

import { CounterService } from './counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show intital count as ', () => {
    expect(service.count()).toBe(0);
  })

  it('should update count to 1 when increment is called', () => {
    service.increment();

    expect(service.count()).toBe(1);
  })

  it('should update count to 1 when increment is called', () => {
    service.increment();
    service.increment();

    expect(service.count()).toBe(2);
  })

  it('should reset count to 0 when reset is called', () => {
    service.reset();

    expect(service.count()).toBe(0);
  })
});
