import { ProductService } from '../services/product.service.js';
import responseHandler from '../utils/responseHandler.js';
import { createProductSchema, updateProductSchema } from '../validations/product.validation.js';

export class ProductController {
  static async createProduct(req, res) {
    const { error, value } = createProductSchema.validate(req.body);
    if (error) {
      return responseHandler.error(res)(error.details[0].message);
    }

    const product = await ProductService.createProduct(value);
    return responseHandler.success(res)('Product created successfully', product);
  }

  static async getAllProducts(req, res) {
    const result = await ProductService.getAllProducts(req.query);
    return responseHandler.success(res)('Products retrieved successfully', result);
  }

  static async getProductById(req, res) {
    const product = await ProductService.getProductById(req.params.id);
    return responseHandler.success(res)('Product retrieved successfully', product);
  }

  static async updateProduct(req, res) {
    const { error, value } = updateProductSchema.validate(req.body);
    if (error) {
      return responseHandler.error(res)(error.details[0].message);
    }

    const product = await ProductService.updateProduct(req.params.id, value);
    return responseHandler.success(res)('Product updated successfully', product);
  }

  static async deleteProduct(req, res) {
    await ProductService.deleteProduct(req.params.id);
    return responseHandler.success(res)('Product deleted successfully');
  }
}
