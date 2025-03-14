import { faker } from '@faker-js/faker';
import sequelize from '../config/database.js';
import Product from '../models/Product.js';

const categories = [
  'clothes',
  'women',
  'men',
  'shoes',
  'electronics',
  'others',
];

const generateProducts = (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(categories);
    const title = faker.commerce.productName();

    products.push({
      title,
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      discount: faker.number.int({ min: 0, max: 30 }),
      category: [category], // Each product belongs to one main category
      size: faker.helpers.arrayElements(
        [
          'XS',
          'S',
          'M',
          'L',
          'XL',
          'XXL',
        ],
        { min: 2, max: 4 },
      ),
      color: faker.helpers.arrayElements(
        [
          'red',
          'blue',
          'green',
          'black',
          'white',
          'yellow',
          'purple',
        ],
        { min: 1, max: 3 },
      ),
      image: faker.image.url({ width: 800, height: 600, category: category }),
      inStock: faker.datatype.boolean({ probability: 0.8 }),
    });
  }

  return products;
};

const seedProducts = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: true }); // This will drop and recreate the table
    console.log('Database synced successfully');

    // Generate and insert new products
    const products = generateProducts(50); // Generate 50 products
    await Product.bulkCreate(products);
    console.log(`Successfully seeded ${products.length} products!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedProducts();
