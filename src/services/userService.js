import { UserModel } from '../models';

class UserService {
  static async signup(newUser) {
    const user = new UserModel(newUser);
    return user.save();
  }

  static getAUser(email) {
    return UserModel.findOne({ email });
  }
}

export default UserService;
