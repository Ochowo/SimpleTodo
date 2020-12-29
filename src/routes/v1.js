import express from 'express';
import usersRoute from './api/userRoute';
import todosRoute from './api/todoRoute';

const router = express.Router();
router.use('/v1', usersRoute);
router.use('/v1', todosRoute);

export default router;
