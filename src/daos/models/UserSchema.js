import { Schema } from "mongoose";
import mongoose from "../../core/Connection.js";
import mongoosePaginate from "mongoose-paginate-v2";

  const userCollection = "users";  

  const userModel = new mongoose.Schema({
    email: { type: Schema.Types.String, require: true },
    password: { type: Schema.Types.String, require: true },
  });

  userModel.plugin(mongoosePaginate);

  /* third parameter is added to specify collection */
  const userSchema = mongoose.model(userCollection, userModel, "users");
  /* third parameter is added to specify collection */
  export default userSchema;
