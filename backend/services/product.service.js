import { Op } from 'sequelize';
import Product from '../models/Product.js';

export class ProductService {
  static async createProduct(productData) {
    const product = await Product.create(productData);
    return product;
  }

  static async findProductbyTitle(title) {
    const product = await Product.findOne({
      where: { title },
    });
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
      limit = 10,
    } = query;

    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (category) {
      whereClause.category = { [Op.overlap]: [category] };
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }

    if (inStock !== undefined) {
      whereClause.inStock = inStock === 'true';
    }

    const validSortFields = [
      'createdAt',
      'price',
      'title',
    ];
    const sortField = validSortFields.includes(sort) ? sort : 'createdAt';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const offset = (page - 1) * limit;

    try {
      const products = await Product.findAndCountAll({
        where: whereClause,
        order: [[sortField, sortOrder]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return {
        products: products.rows,
        totalProducts: products.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(products.count / limit),
        limit: parseInt(limit),
      };
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  static async getProductById(id) {
    const product = await Product.findByPk(id);
    return product;
  }

  static async updateProduct(id, updateData) {
    const product = await this.getProductById(id);
    return await product.update(updateData);
  }

  static async deleteProduct(id) {
    await Product.destroy({ where: { id } });
  }
}
