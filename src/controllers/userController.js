import Response from '../helpers/response';
import { userService } from '../services';
import Authenticate from '../middleware/authenticate';

const response = new Response();

class UserController {
  /**
   * @param  {} req
   * @param  {} res
   */
  static async registerUser(req, res) {
    try {
      const findUser = await userService.getAUser(req.body.email);
      if (findUser) {
        response.setError(409, 'User already exist');
        return response.send(res);
      }
      const user = await userService.signup(req.body);
      console.log(user, 'lll');
      const {
        id, firstName, lastName, email,
      } = user;
      const token = Authenticate.generateToken(id, user.email, user.firstName, user.lastName);
      if (user) {
        const data = {
          id,
          firstName,
          lastName,
          email,
          token,
        };
        response.setSuccess(201, 'User created successfully', data);
      }
      return response.send(res);
    } catch (error) {
      console.log(error, 'ppp');
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  /**
   * @param  {} req
   * @param  {} res
   */
  static async login(req, res) {
    const {
      email, password,
    } = req.body;
    const user = await userService.getAUser(email);
    if (!user) {
      console.log('noooooooooooooo');
      response.setError(404, 'User does not exist');
      return response.send(res);
    }
    if (user.comparePassword(password, user)) {
      console.log(user.firstName);
      const {
        id, firstName, lastName, registerDate,
      } = user;
      const token = Authenticate.generateToken(user.id, user.email, user.firstName, user.lastName);
      const data = {
        id, firstName, lastName, email, registerDate, token,
      };

      response.setSuccess(200, 'Login successful', data);
      return response.send(res);
    }
    response.setError(401, 'Invalid credentials');
    return response.send(res);
  }
}

export default UserController;
