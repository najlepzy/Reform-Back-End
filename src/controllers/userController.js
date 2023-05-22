import UserManager from "../Dao/userManager.js";
import idValidation from "../validation/idValidation.js";
import userValidation from "../validation/userValidation.js";

export const list = async (request, response, next) => {
  try {
    const { limit, page } = request.query;
    const manager = new UserManager();

    const users = await manager.paginate({ limit, page });

    response.send({
      status: "success",
      users: users.docs,
      ...users,
      docs: undefined,
    });
  } catch (e) {
    next(e);
  }
};

export const getOne = async (request, response, next) => {
  try {
    await idValidation.parseAsync(request.params);

    const { id } = request.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);

    response.send({ status: "success", user });
  } catch (e) {
    next(e);
  }
};

export const save = async (request, response, next) => {
  try {
    const manager = new UserManager();
    const user = await manager.create(request.body);

    response.send({ status: "success", user, message: "User created." });
  } catch (e) {
    next(e);
  }
};

export const update = async (request, response, next) => {
  try {
    await userUpdateValidation.parseAsync({ ...request.params, ...request.body });

    const { id } = request.params;

    const manager = new UserManager();
    const responseult = await manager.updateOne(id, request.body);

    response.send({ status: "success", responseult, message: "User updated." });
  } catch (e) {
    next(e);
  }
};

export const deleteOne = async (request, response, next) => {
  try {
    const { id } = request.params;

    const manager = new UserManager();
    await manager.deleteOne(id);

    response.send({ status: "success", message: "User deleted." });
  } catch (e) {
    next(e);
  }
};