import { Router } from 'express';
import TodoController from '../../controllers/todosController';
import { todoValidator } from '../../middleware/validators';
import Authenticate from '../../middleware/authenticate';

const { verifyToken } = Authenticate;

const router = Router();

router.post('/todos', todoValidator, verifyToken, TodoController.createTodo);
router.get('/todos', verifyToken, TodoController.getToDos);
router.get('/todos/:id', verifyToken, TodoController.getToDo);
router.put('/todos/:id', verifyToken, TodoController.updateToDo);
router.delete('/todos/:id', verifyToken, TodoController.deleteToDo);
export default router;
