import express from 'express';
import usersRoute from './api/userRoute';
import todosRoute from './api/todoRoute';
import mailRoute from './api/mailRoute';

const router = express.Router();
router.use('/v1', usersRoute);
router.use('/v1', todosRoute);
router.use('/v1', mailRoute);

export default router;
