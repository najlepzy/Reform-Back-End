import userSchema from "./UserSchema.js";

class UserMongooseDao {
  async paginate(criteria) {
    const { limit, page } = criteria;
    const userDocuments = await userSchema.paginate({}, { limit, page });

    userDocuments.docs = userDocuments.docs.map((document) => ({
      email: document.email,
      password: document.password,
    }));

    return userDocuments;
  }

  async getOne(id) {
    const userDocument = await userSchema.findOne({ _id: id });

    if (!userDocument) {
      throw new Error("User dont exist.");
    }

    return {
      email: userDocument?.email,
      password: userDocument?.password,
    };
  }

  async getOneByEmail(email) {
    const userDocument = await userSchema.findOne({ email });

    if (!userDocument) {
      throw new Error("User dont exist.");
    }

    return {
      email: userDocument?.email,
      password: userDocument?.password,
    };
  }

  async create(data) {
    const userDocument = await userSchema.create(data);

    return {
      email: userDocument.email,
      password: userDocument.password,
    };
  }

  async updateOne(id, data) {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!userDocument) {
      throw new Error("User dont exist.");
    }

    return {
      email: userDocument.email,
      password: userDocument.password,
    };
  }

  async deleteOne(id) {
    return userSchema.deleteOne({ _id: id });
  }
}
export default UserMongooseDao;
