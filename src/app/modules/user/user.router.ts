import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/sign-in', UserController.createUser);

router.get('/login', UserController.loginUserFromDB);

export const UserRoute = router;
