const { expect } = require("chai");
const model = require("../model");

describe("Model Tests", () => {
  beforeEach(() => {
    // Reset the product data before each test
    model.resetProducts();
  });

  describe("getAllProducts()", () => {
    it("should return all products", () => {
      const products = model.getAllProducts();
      expect(products).to.have.lengthOf(3); // Ensure there are 3 products
    });
  });

  describe("getProductById()", () => {
    it("should return the correct product by ID", () => {
      const product = model.getProductById(2);
      expect(product).to.have.property("name", "Phone"); // Check the name of the product
    });

    it("should return undefined for a non-existent product", () => {
      const product = model.getProductById(999); // Product ID 999 doesn't exist
      expect(product).to.be.undefined; // Should return undefined for a non-existent product
    });
  });

  describe("purchaseProduct()", () => {
    it("should decrease product stock by 1 when purchased", () => {
      const result = model.purchaseProduct(1); // Purchase product with ID 1 (Laptop)
      expect(result.success).to.be.true; // Purchase should be successful
      expect(result.product).to.have.property("stock", 9); // Stock should decrease by 1
    });

    it("should return an error message when out of stock", () => {
      // Simulate purchasing until the product is out of stock
      for (let i = 0; i < 10; i++) {
        model.purchaseProduct(1); // Reduce stock of product 1 (Laptop)
      }
      const result = model.purchaseProduct(1); // Try purchasing again when out of stock
      expect(result).to.have.property("message", "Out of stock"); // Should return "Out of stock" message
    });
  });
});
