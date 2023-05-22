import session from "express-session"
import { Router } from "express";
import passport from "passport";
import fileStore from "session-file-store";
import mongoStore from "connect-mongo";
import auth from "./auth.js";
import "../Dao/models/UserSchema.js";
import {
  forgetPassword,
  login,
  login2,
  logout,
  signup,
  register,
  fail,
} from "../controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.use(
  session({
    store: mongoStore.create({ mongoUrl: process.env.URI, ttl: 15 }),
    secret: "my-secret",
    responseave: false,
    saveUninitialized: false,
  })
);
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (request, response) => {}
);
sessionRouter.get(
  "/github-callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (request, response) => {
    request.session.user = request.user;
    console.log(request.user);
    response.redirect("/");
  }
);
sessionRouter.get("/fail", fail);

sessionRouter.post("/login", login);
sessionRouter.post(
  "/login2",
  passport.authenticate("login2", { failureRedirect: "/api/sessions/fail" }),
  login2
);
sessionRouter.post("/logout", logout);
sessionRouter.post("/signup", signup);
sessionRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/api/sessions/fail" }),
  register
);
sessionRouter.get("/fail", fail);
sessionRouter.post("/forget-password", forgetPassword);

export default sessionRouter;
