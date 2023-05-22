import { Schema } from "mongoose";


const cartCollection = "Carts";

const cartsModel = new mongoose.Schema({
  id: { type: Schema.Types.String, require: true },

  products: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Products" },

      quantity: { type: Schema.Types.Number, require: true },
    },
  ],
});

cartsModel.pre("find", function () {
  this.populate("products._id");
});

/* third parameter is added to specify collection */

const CartSchema = mongoose.model(cartCollection, cartsModel, "Carts");

/* third parameter is added to specify collection */

export default CartSchema;
