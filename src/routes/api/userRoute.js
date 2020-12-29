import { Router } from 'express';
import UserController from '../../controllers/userController';
import { signUpValidator, signInValidator } from '../../middleware/validators';

const router = Router();

router.post('/auth/signup', signUpValidator, UserController.registerUser);
router.post('/auth/signin', signInValidator, UserController.login);
export default router;
