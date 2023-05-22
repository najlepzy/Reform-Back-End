import UserManager from "../Dao/userManager.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

export const login = async (request, response) => {
  const { email, password } = request.body;

  if (!email && !password) {
    throw new Error("Email and Password invalid format.");
  }

  const manager = new UserManager();
  const user = await manager.getOneByEmail(email);
  const isHashedPassword = await isValidPassword(password, user.password);

  if (!isHashedPassword) {
    return response
      .status(401)
      .send({ message: "Login failed, invalid password." });
  }

  request.session.user = { email };

  response.send({ message: "Login success!" });
};

export const login2 = async (request, response) => {
  if (!request.user)
    return response
      .status(400)
      .send({ status: "error", message: "Invalid credentials" });

  request.session.user = {
    firstName: request.user.firstName,
    lastName: request.user.lastName,
    email: request.user.email,
  };

  response.send({ status: "success", message: "Login success" });
};

export const logout = async (request, response) => {
  request.session.destroy((err) => {
    if (!err) {
      return response.send({ message: "Logout ok!" });
    }

    response.send({ message: "Logout error!", body: err });
  });
};

export const signup = async (request, response) => {
  const manager = new UserManager();

  const dto = {
    ...request.body,
    password: await createHash(request.body.password, 10),
  };

  const user = await manager.create(dto);

  response
    .status(201)
    .send({ status: "success", user, message: "User created." });
};

export const register = async (request, response) => {
  response.send({ status: "success", message: "User registered" });
};

export const forgetPassword = async (request, response) => {
  const { email, password } = request.body;
  const manager = new UserManager();

  const dto = {
    email,
    password: await createHash(password, 10),
  };

  const user = await manager.forgetPassword(dto);

  response
    .status(200)
    .send({ status: "success", user, message: "User change password." });
};

export const fail = async (request, response) => {
  console.log("Failed strategy");
  response.status(400).send({ error: "Failed" });
};
