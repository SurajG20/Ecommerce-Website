const fs = require("fs");

fs.readFile("fake.json", "utf-8", (err, products) => {
  products = JSON.parse(products);
  products = products.map((product) => {
    return {
      title: product.title,
      description: product.description,
      image: product.image,
      category: product.category.toLowerCase(),
      size:
        product.category === "Clothes"
          ? ["S", "M", "L"]
          : product.category === "Shoes"
          ? ["40", "41", "42", "43", "44", "45"]
          : [],
      color: ["red", "green", "yellow", "orange"],
      price: product.price,
      inStock: true,
      discountPercent: Math.floor(Math.random() * (25 - 10 + 1) + 10),
      discountPrice: Math.floor(
        product.price -
          (product.price * Math.floor(Math.random() * (25 - 10 + 1) + 10)) / 100
      ),
      rating: product.rating.rate,
    };
  });
  products = JSON.stringify(products);
  fs.writeFileSync("dummy.json", products);
});
