import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { LogService } from './log.service';

describe('UserService', () => {
  let service: UserService;

  const mockLogger = {
    info: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        UserService, 
        { provide: LogService, useValue: mockLogger }
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the user using async/await', async () => {
    const result = await service.getUser();

    expect(result).toBe('Andrew');
  });

  it('should resolve to Andrew using .resolves', async () => {
    await expect(service.getUser()).resolves.toBe('Andrew');
  });

  // it('should reject with the expected error', async () => {
  //   await expect(service.getUser()).rejects.toEqual(new Error('Failed to fetch user'));
  // });

  it('should call logger.info()', () => {
    service.saveUser();

    expect(mockLogger.info).toHaveBeenCalled();
  });

  it('should call logger.info() exactly once', () => {
    service.saveUser();

    expect(mockLogger.info).toHaveBeenCalledTimes(1);
  });

  it('should call logger.info() with the correct message', () => {
    service.saveUser();

    expect(mockLogger.info).toHaveBeenCalledWith('Saving user');
  });

  it('should verify the last logger.info() call', () => {
    service.saveUser();

    expect(mockLogger.info).toHaveBeenLastCalledWith('Saving user');
  });

});
