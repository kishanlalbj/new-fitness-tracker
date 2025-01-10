import User from "../models/User.js";

export default class UserService {
  static async findUserByEmail(email) {
    const user = await User.findOne({ email }).exec();

    return user;
  }

  static async findUserById(id) {
    return await User.findById(id).exec();
  }

  static async saveUser(user) {
    const newUser = new User(user);

    const savedUser = newUser.save();

    return savedUser;
  }
}
