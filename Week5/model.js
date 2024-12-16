const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 10 },
  { id: 2, name: "Phone", price: 800, stock: 15 },
  { id: 3, name: "Tablet", price: 600, stock: 20 },
];

module.exports = {
  getAllProducts: () => products,
  getProductById: (id) => products.find(product => product.id === id),
  purchaseProduct: (id) => {
      const product = products.find(product => product.id === id);
      if (product && product.stock > 0) {
          product.stock -= 1;
          return { success: true, product };
      }
      return { success: false, message: "Out of stock" };
  },
};
