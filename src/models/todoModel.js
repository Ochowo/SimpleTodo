import mongoose from 'mongoose';

const { Schema } = mongoose;
const todoSchema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  createAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
