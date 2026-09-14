import { TestBed } from '@angular/core/testing';

import { Product, ProductService } from './product.service';
import { ApiService } from './api.service';
import { LogService } from './log.service';

describe('ProductService', () => {
  let service: ProductService;

  const mockApi = {
    get: jest.fn(),
  };

  beforeEach(() => {
    mockApi.get.mockReset();

    TestBed.configureTestingModule({
      providers: [
        ProductService, 
        { provide: ApiService, useValue: mockApi }
      ],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API once', async () => {
    mockApi.get.mockResolvedValue([{ id: 1, name: 'Laptop' }]);
    await service.loadProducts();

    expect(mockApi.get).toHaveBeenCalledTimes(1);
  });

  it('should call the correct endpoint', async () => {
    mockApi.get.mockResolvedValue([{ id: 1, name: 'Laptop' }]);
    await service.loadProducts();

    expect(mockApi.get).toHaveBeenCalledWith('/products');
  });

  it('should return the expected product data', async () => {
    const products = [{ id: 1, name: 'Laptop' }];
    mockApi.get.mockResolvedValue(products);
    const result = await service.loadProducts();

    expect(result).toEqual(products);
  });

  
  it('should reject when the API request fails', async () => {
    const error = new Error('API request failed');

    mockApi.get.mockRejectedValue(error);

    await expect(service.loadProducts()).rejects.toThrow('API request failed');

    expect(mockApi.get).toHaveBeenCalledTimes(1);
    expect(mockApi.get).toHaveBeenCalledWith('/products');
  });

  describe('Add Products', () => {
    it('should add product to products', () => {
      const product: Product = {id: 1, name: "Laptop"};

      service.addProduct(product);

      expect(service.products).toEqual([{
        id: 1, name:"Laptop"
      }])
    });

    it('should add a product to the products array', () => {
      const product: Product = {
        id: 1,
        name: 'Laptop'
      };

      service.addProduct(product);

      expect(service.products).toContain(product);
    });

    it('should increase the product count when a product is added', () => {
      const product: Product = {
        id: 1,
        name: 'Laptop'
      };

      expect(service.products).toHaveLength(0);

      service.addProduct(product);

      expect(service.products).toHaveLength(1);
    });
  });

  describe('Remove Products', () => {
    it('Remove product from products array by id', () => {
      const product1: Product = {
        id: 1,
        name: 'Laptop',
        quantity: 1,
        price: 200
      };

      const product2: Product = {
        id: 2,
        name: 'Phone',
        quantity: 1,
        price: 200
      };

      service.addProduct(product1);
      service.addProduct(product2);

      service.removeProduct(1);

      expect(service.products).toEqual([product2]);
    });

    it('should not change the products when the id does not exist', () => {
      const product: Product = {
        id: 1,
        name: 'Laptop',
        quantity: 1,
        price: 200
      };

      service.addProduct(product);

      service.removeProduct(999);

      expect(service.products).toEqual([product]);
    });
  });

  describe('calculateVat()', () => {

    it('should calculate 23% VAT', () => {
      const product: Product = {
        id: 1,
        name: 'Laptop',
        price: 100,
        quantity: 1
      };

      service.addProduct(product);

      expect(service.calculateVat()).toBeCloseTo(19.55);
    });

    it('should calculate VAT for multiple products', () => {
      service.addProduct({
        id: 1,
        name: 'Laptop',
        price: 100,
        quantity: 2
      });

      service.addProduct({
        id: 2,
        name: 'Mouse',
        price: 50,
        quantity: 2
      });

      // Subtotal = 200 + 100 = 300
      // VAT = 300 * 23% = 69

      expect(service.calculateVat()).toBeCloseTo(58.65);
    });

    it('should calculate VAT after discount', () => {
      service.addProduct({
        id: 1,
        name: 'Laptop',
        price: 100,
        quantity: 1
      });

      // Subtotal = 100
      // discount = 15
      // Discounted total = 85
      // VAT = 85 * 23% = 19.55

      expect(service.calculateVat()).toBeCloseTo(19.55);
    });

    it('should return 0 VAT for an empty basket', () => {
      expect(service.calculateVat()).toBe(0);
    });
  });


  describe('calculateGrandTotal()', () => {

    it('should calculate subtotal plus VAT', () => {
      service.addProduct({
        id: 1,
        name: 'Laptop',
        price: 100,
        quantity: 1
      });

      expect(service.calculateGrandTotal()).toBeCloseTo(104.55);
    });

    it('should calculate grand total with multiple products', () => {
      service.addProduct({
        id: 1,
        name: 'Laptop',
        price: 100,
        quantity: 2
      });

      service.addProduct({
        id: 2,
        name: 'Mouse',
        price: 50,
        quantity: 2
      });

      expect(service.calculateGrandTotal()).toBeCloseTo(313.65);
    });

    it('should calculate grand total after discount', () => {
      service.addProduct({
        id: 1,
        name: 'Laptop',
        price: 100,
        quantity: 1
      });

      // Subtotal = 100
      // Discount = 15
      // After discount = 85
      // VAT = 19.55
      // Grand total = 104.5

      expect(service.calculateGrandTotal()).toBeCloseTo(104.55);
    });

    it('should return 0 for an empty basket', () => {
      expect(service.calculateGrandTotal()).toBe(0);
    });
  });


  describe('clearBasket()', () => {

    it('should remove all products from the basket', () => {
      service.addProduct({
        id: 1,
        name: 'Laptop',
        price: 100,
        quantity: 1
      });

      service.addProduct({
        id: 2,
        name: 'Mouse',
        price: 50,
        quantity: 2
      });

      expect(service.products).toHaveLength(2);

      service.clearBasket();

      expect(service.products).toEqual([]);
      expect(service.products).toHaveLength(0);
    });

    it('should reset the discount when clearing the basket', () => {
      service.addProduct({
        id: 1,
        name: 'Laptop',
        price: 100,
        quantity: 1
      });

      service.clearBasket();

      expect(service.products).toEqual([]);
    });

    it('should allow clearing an already empty basket', () => {
      service.clearBasket();

      expect(service.products).toEqual([]);
    });
  });
});
