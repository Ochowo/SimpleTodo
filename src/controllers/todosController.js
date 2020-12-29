import Response from '../helpers/response';
import { todoService } from '../services';

const response = new Response();

class TodoController {
  /**
   * @param  {} req
   * @param  {} res
   */
  static async createTodo(req, res) {
    const { userId } = req.user;
    try {
      const todoObj = {
        task: req.body.task,
        ownerId: userId,

      };
      const createTodo = await todoService.createTodo(todoObj);
      if (createTodo) {
        response.setSuccess(201, 'Todo created successfully', createTodo);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  static async getToDos(req, res) {
    try {
      const { userId } = req.user;
      const todos = await todoService.getTodos(userId);
      if (todos.length < 1) {
        response.setSuccess(404, 'Todos not found', []);
      } else {
        response.setSuccess(200, null, todos);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  static async getToDo(req, res) {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const todos = await todoService.getTodo(id, userId);
      if (todos.length < 1) {
        response.setSuccess(404, 'Todo not found', {});
      } else {
        response.setSuccess(200, null, todos);
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  static async updateToDo(req, res) {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const findTodo = await todoService.getTodo(id, userId);
      if (findTodo.length < 1) {
        response.setSuccess(404, 'Todo not found', {});
      } else {
        const todoObj = {
          task: req.body.task || findTodo[0].task,
          completed: req.body.completed || findTodo[0].completed,
        };
        const todos = await todoService.updateTodo(id, userId, todoObj);
        response.setSuccess(200, 'Todo updated successfully', todos);
      }

      return response.send(res);
    } catch (error) {
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  static async deleteToDo(req, res) {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const findTodo = await todoService.getTodo(id, userId);
      if (findTodo.length < 1) {
        response.setSuccess(404, 'Todo not found', {});
      } else {
        await todoService.deleteTodo(id);
        response.setSuccess(200, 'Todo deleted successfully');
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message);
      return response.send(res);
    }
  }
}

export default TodoController;
