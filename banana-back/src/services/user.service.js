import User from "../models/user.model.js";

class UserService {
  async getUser(user_dni) {
    if (user_dni) {
      const foundedUser = await User.findByPk(user_dni);
      return foundedUser;
    }
    const newUser = await User.create({ availableTime: 120 });
    return newUser;
  }
}

export default new UserService();
