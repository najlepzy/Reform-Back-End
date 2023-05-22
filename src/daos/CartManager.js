import CartSchema from "./models/CartSchema.js";

class CartManager {
  // Add the cart by parameter
  async addCart() {
    let result = await CartSchema.create({});
    return result;
  }

  // Return all carts.
  async getCarts() {
    let carts = await CartSchema.find();
    return carts;
  }

  async getCartsById(id) {
    const result = await CartSchema.findOne({ _id: id });
    if (!result) {
      console.log("Cart Not Found");
      return null;
    }
    return result;
  }
  async addProductToCart(id, ProductId) {
    let Found = await this.getCartsById(id);
    if (!Found) return false;
    if(!Found.products)
      Found.products = []
    let foundIndex = await Found.products.findIndex(
      (product) => product.id === ProductId
    );
    if (foundIndex < 0)
      Found.products.push({ _id: ProductId, quantity: 1 });
    else Found.products[foundIndex].quantity++;
    let result = await CartSchema.updateOne({ _id: id }, {$set: {products: Found.products}});
    return result;
  }
}

export default CartManager;
