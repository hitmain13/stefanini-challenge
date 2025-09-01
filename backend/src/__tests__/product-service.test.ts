import { ProductService } from '../services/product-service';
import { IProductRepository } from '../repositories/product-repository';
import { Product } from '../models/types';

describe('ProductService', () => {
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let productService: ProductService;

  beforeEach(() => {
    mockProductRepo = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
    };
    productService = new ProductService(mockProductRepo);
  });

  describe('getProduct', () => {
    it('should return a product when found', async () => {
      const mockProduct: Product = {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        priceSale: null,
        imageUrl: 'test.jpg'
      };

      mockProductRepo.findById.mockResolvedValue(mockProduct);

      const result = await productService.getProduct('1');

      expect(result).toEqual(mockProduct);
      expect(mockProductRepo.findById).toHaveBeenCalledWith('1');
    });

    it('should return null when product not found', async () => {
      mockProductRepo.findById.mockResolvedValue(null);

      const result = await productService.getProduct('999');

      expect(result).toBeNull();
      expect(mockProductRepo.findById).toHaveBeenCalledWith('999');
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          price: 100,
          priceSale: null,
          imageUrl: 'product1.jpg'
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Description 2',
          price: 200,
          priceSale: 150,
          imageUrl: 'product2.jpg'
        }
      ];

      mockProductRepo.findAll.mockResolvedValue(mockProducts);

      const result = await productService.getAllProducts();

      expect(result).toEqual(mockProducts);
      expect(mockProductRepo.findAll).toHaveBeenCalled();
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 300,
        priceSale: 250,
        imageUrl: 'new-product.jpg'
      };

      const createdProduct: Product = {
        id: '3',
        ...productData
      };

      mockProductRepo.create.mockResolvedValue(createdProduct);

      const result = await productService.createProduct(productData);

      expect(result).toEqual(createdProduct);
      expect(mockProductRepo.create).toHaveBeenCalledWith(productData);
    });
  });
});
