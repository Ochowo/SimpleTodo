import Authenticate from '../middleware/authenticate';

export const newUser = {
 
  firstName: 'User',
  lastName: 'Test',
  email: 'user@gmail.com',
  password: 'password',
};
export const wrongCredentials = {

  email: 'user@gmail.com',
  password: 'password1',
};
export const goodUserData = {
  email: 'test@gmail.com',
  lastName: 'Test',
  firstName: 'User',
  password: 'testing123',
};

export const emptyUserData = {
  email: '',
  lastName: '',
  firstName: '',
  password: '',
};
export const todo = {
  task: 'Assignment',
  ownerId: '5feae263a7d00124cc536ee5',
  completed: false,
};

export const goodUserObj = {
  email: 'tester@gmail.com',
  lastName: 'Test',
  firstName: 'User',
  password: 'testing123',
};

export const emptyTodo = {
  task: '',
  ownerId: '',
  completed: '',
};

export const unknownUser = Authenticate.generateToken(
  2000,
  'unknown@mail.com',
  'unknown',
);
export const getUserData = (args) => ({
  ...goodUserData,
  ...args,
});
