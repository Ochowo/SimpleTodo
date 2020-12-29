import { TodoModel } from '../models';

class TodoService {
  static async createTodo(newTodo) {
    console.log(newTodo);
    const todo = await new TodoModel(newTodo);
    return todo.save();
  }

  static async getTodos(userId) {
    const todos = TodoModel.find({ ownerId: userId })
      .populate('ownerId', 'firstName lastName');
    return todos;
  }

  static async getTodo(id, userId) {
    console.log(userId);
    const todos = await TodoModel.find({ _id: id, ownerId: userId })
      .populate('ownerId', 'firstName lastName');
    return todos;
  }

  static async updateTodo(id, userId, todoData) {
    console.log(todoData, 'pink');
    const todos = await TodoModel.findByIdAndUpdate(
      { _id: id, ownerId: userId },
      { $set: { task: todoData.task, completed: todoData.completed } },
      { new: true },
    );
    console.log(todos, 'o');
    return todos.save();
  }

  static async deleteTodo(id) {
    const todos = TodoModel.findByIdAndDelete({ _id: id });
    return todos;
  }
}

export default TodoService;
