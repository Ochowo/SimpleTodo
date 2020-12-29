import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from '../helpers/response';

dotenv.config();
const response = new Response();

class Authenticate {
  /**
   * @param  {} id
   * @param  {} email
   */
  static generateToken(id, email, firstName, lastName) {
    const token = jwt.sign(
      {
        userId: id, email, firstName, lastName,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1d',
      },
    );
    return token;
  }

  /**
   * @param  {} req
   * @param  {} res
   * @param  {} next
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      response.setError(401, 'No Authentication Token Provided');
      return response.send(res);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      console.log(decoded, 'pppppppppppppppppppp');
      if (err) {
        response.setError(401, 'Token not verified');
        return response.send(res);
      }
      const {
        userId, email, firstName, lastName,
      } = decoded;
      req.user = {
        userId, email, firstName, lastName,
      };
      return next();
    });
    return null;
  }
}

export default Authenticate;
