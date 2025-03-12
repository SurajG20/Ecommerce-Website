import Product from '../models/Product.js';
import { Op } from 'sequelize';
import ResponseHandler from '../utils/responseHandler.js';

export class ProductService {
  static async createProduct(productData) {
    const existingProduct = await Product.findOne({ 
      where: { title: productData.title }
    });
    
    if (existingProduct) {
      return ResponseHandler.error('Product with this title already exists');
    }

    const product = await Product.create(productData);
    return product;
  }

  static async getAllProducts(query) {
    const { 
      search, 
      category, 
      minPrice, 
      maxPrice, 
      inStock,
      sort = 'createdAt',
      order = 'DESC',
      page = 1,
      limit = 10
    } = query;

    const whereClause = {};
    
    if (search) {
      whereClause.title = { [Op.iLike]: `%${search}%` };
    }
    
    if (category) {
      whereClause.category = { [Op.contains]: [category] };
    }
    
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }
    
    if (inStock !== undefined) {
      whereClause.inStock = inStock === 'true';
    }

    const offset = (page - 1) * limit;
    
    const products = await Product.findAndCountAll({
      where: whereClause,
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return {
      products: products.rows,
      totalProducts: products.count,
      currentPage: page,
      totalPages: Math.ceil(products.count / limit)
    };
  }

  static async getProductById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      return ResponseHandler.notFound('Product not found');
    }
    return product;
  }

  static async updateProduct(id, updateData) {
    const product = await this.getProductById(id);
    if (product.success === false) return product;
    
    if (updateData.title && updateData.title !== product.title) {
      const existingProduct = await Product.findOne({
        where: {
          title: updateData.title,
          id: { [Op.ne]: id }
        }
      });
      
      if (existingProduct) {
        return ResponseHandler.error('Product with this title already exists');
      }
    }

    return await product.update(updateData);
  }

  static async deleteProduct(id) {
    const product = await this.getProductById(id);
    if (product.success === false) return product;
    
    await product.destroy();
    return true;
  }
} 