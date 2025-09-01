import { Request, Response } from 'express';
import { ProductService } from '../services/product-service';
import { createProductController } from '../controllers/product-controller';
import { Product } from '../models/types';

describe('ProductController', () => {
  let mockProductService: jest.Mocked<ProductService>;
  let productController: ReturnType<typeof createProductController>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockProductService = {
      getProduct: jest.fn(),
      getAllProducts: jest.fn(),
      createProduct: jest.fn(),
    } as any;

    productController = createProductController(mockProductService);

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  describe('getProduct', () => {
    it('should return product when found', async () => {
      const mockProduct: Product = {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        priceSale: null,
        imageUrl: 'test.jpg'
      };

      mockRequest = {
        params: { id: '1' }
      };

      mockProductService.getProduct.mockResolvedValue(mockProduct);

      await productController.getProduct(mockRequest as Request, mockResponse as Response);

      expect(mockProductService.getProduct).toHaveBeenCalledWith('1');
      expect(mockJson).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 404 when product not found', async () => {
      mockRequest = {
        params: { id: '999' }
      };

      mockProductService.getProduct.mockResolvedValue(null);

      await productController.getProduct(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    it('should return 500 on error', async () => {
      mockRequest = {
        params: { id: '1' }
      };

      mockProductService.getProduct.mockRejectedValue(new Error('Database error'));

      await productController.getProduct(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Internal error' });
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
        }
      ];

      mockProductService.getAllProducts.mockResolvedValue(mockProducts);

      await productController.getAllProducts(mockRequest as Request, mockResponse as Response);

      expect(mockProductService.getAllProducts).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(mockProducts);
    });

    it('should return 500 on error', async () => {
      mockProductService.getAllProducts.mockRejectedValue(new Error('Database error'));

      await productController.getAllProducts(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Internal error' });
    });
  });

  describe('createProduct', () => {
    it('should create product with valid data', async () => {
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

      mockRequest = {
        body: productData
      };

      mockProductService.createProduct.mockResolvedValue(createdProduct);

      await productController.createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockProductService.createProduct).toHaveBeenCalledWith({
        name: 'New Product',
        description: 'New Description',
        price: 300,
        priceSale: 250,
        imageUrl: 'new-product.jpg'
      });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(createdProduct);
    });

    it('should return 400 when required fields are missing', async () => {
      mockRequest = {
        body: { name: 'Product' }
      };

      await productController.createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ 
        message: 'Name, description and price are required' 
      });
    });

    it('should generate random image URL when not provided', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 300
      };

      const createdProduct: Product = {
        id: '3',
        ...productData,
        priceSale: null,
        imageUrl: 'https://picsum.photos/400/300?random=123'
      };

      mockRequest = {
        body: productData
      };

      mockProductService.createProduct.mockResolvedValue(createdProduct);

      await productController.createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockProductService.createProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New Product',
          description: 'New Description',
          price: 300,
          priceSale: null,
          imageUrl: expect.stringMatching(/^https:\/\/picsum\.photos\/400\/300\?random=\d+$/)
        })
      );
    });
  });
});
