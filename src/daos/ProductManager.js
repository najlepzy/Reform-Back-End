import productSchema from "./models/ProductSchema.js";
import Manager from "../Dao/Manager.js";

class ProductManager extends Manager {
  // Add the product by parameter
  async addProduct(data) {
    let result = await productSchema.create(data);
    return result;
  }

  // Return all products.
  async getProducts(params) {
    const sort = this.getSortFromParams(params);
    const filter = this.getCleanFilters(productSchema.schema.paths, params);
    
    let products = [];
    if (!sort) {
      products = await productSchema.aggregate([{ $match: filter }]);
    } else {
      products = await productSchema.aggregate([{ $match: filter }, { $sort: sort }]);
    }
  
    const options = {
      page: params.page || 1,
      limit: params.limit || 5,
      sort: sort
    };
    const result = await productSchema.paginate(filter, options);
  
    return result;
  }

  async getProductsById(id) {
    const result = await productSchema.findOne({ _id: id });
    if (!result) {
      console.log("Product Not Found");
      return null;
    }
    return result;
  }

  async updateProduct(id, new_data) {
    delete new_data["id"];
    delete new_data["_id"];
    let result = await productSchema.updateOne({ _id: id }, new_data);
    return result;
  }

  async deleteProduct(id) {
    let result = await productSchema.deleteOne({ _id: id });
    return result;
  }
}

export default ProductManager;
