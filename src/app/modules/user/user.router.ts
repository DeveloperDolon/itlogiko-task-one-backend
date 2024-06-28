import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/sign-up', UserController.createUser);

router.put('/login', UserController.loginUserFromDB);

export const UserRoute = router;
