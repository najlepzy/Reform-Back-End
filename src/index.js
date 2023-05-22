import dotenv from "dotenv";
import express from "express";
import orderRouter from "./routes/orderRouter.js";
import ProductManager from "./daos/ProductManager.js";
import mongoose from "mongoose";

const env = dotenv.config().parsed;
/* Mongoose configuration vsc */

await mongoose
  .connect(env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected 🍕");
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("CONNECTED");
});

const port = 8081;
const app = express();
app.use(express.urlencoded({ extended: true }));

/* Starting Handlebars */
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");
/* Ending Handlebars */

app.use(express.json());
/* css */
app.use("/public", express.static("public"));
/* css */

/* Mongoose Start*/
app.use("/api/products", ProductsRouter);
/* Mongoose End*/
app.use("/api/carts", cartRouter);
app.use("/home", ProductViews);

/* Multer Start */
// app.use("/api/multer", MulterRouter);
/* Multer End*/
/* CookieParser */
app.use("/api/cookies", cookieRouter);
/* CookieParser */

/* logger */
app.use(logger);
/* logger */

/* Session */
app.use("/api/sessions", sessionRouter);
/* Session */
app.use(errorHandler);

const connectionInstance = app.listen(port, () => {
  console.log(`Server is running on port 8081 ${port}`);
});

export default connectionInstance;
